var express = require('express');
var app = module.exports = express();
var record = require('blue-button-record');
var bbMatch = require("blue-button-match");
var _ = require("underscore");
var async = require("async");

//Main function, performs match and dedupes.

function reconcile(username, newObject, baseObject, newRecordID, callback) {
    newObjectForParsing = newObject;

    var baseObjectForParsing = {};
    for (var iObj in baseObject) {
        baseObjectForParsing[iObj] = {};
        baseObjectForParsing[iObj] = record.cleanSection(baseObject[iObj]);

        if (baseObjectForParsing[iObj] === undefined) {
            delete baseObjectForParsing[iObj];
        }
    }

    //BB Matching library expects object for demographics.
    function prepDemographics() {
        if (baseObjectForParsing.demographics instanceof Array) {
            if (baseObjectForParsing.demographics.length > 0) {
                baseObjectForParsing.demographics = baseObjectForParsing.demographics[0];

                //remove PIM artifacts in demographics section
                delete baseObjectForParsing.demographics.pim;
            }
        }
        if (newObjectForParsing.demographics instanceof Array) {
            if (newObjectForParsing.demographics.length > 0) {
                newObjectForParsing.demographics = newObjectForParsing.demographics[0];

                //remove PIM artifacts in demographics section
                delete newObjectForParsing.demographics.pim;
            }
        }
    }
    prepDemographics();

    baseObjectForParsing = {}.data = baseObjectForParsing;
    newObjectForParsing = {}.data = newObjectForParsing;

    //console.log(JSON.stringify(newObjectForParsing.social_history, null, 10));
    //console.log('------------------');
    //console.log(JSON.stringify(baseObjectForParsing.social_history, null, 10));
    var matchResult = bbMatch.match(newObjectForParsing, baseObjectForParsing);
    //console.log(JSON.stringify(matchResult.match.social_history, null, 10));

    delete baseObjectForParsing.data;
    delete newObjectForParsing.data;

    function revertDemographics() {
        if (_.isObject(newObjectForParsing.demographics) === true && _.isArray(newObjectForParsing.demographics) === false) {
            newObjectForParsing.demographics = new Array(newObjectForParsing.demographics);
        }
    }

    function deDuplicateNew(match, matchObject) {
        _.map(match, function (value, key) {
            if (_.isArray(value)) {
                //Find all duplicate source entries.
                var duplicateArray = [];
                for (var deLoop in value) {
                    if (value[deLoop].dest === 'src' && value[deLoop].match === 'duplicate') {
                        duplicateArray.push(value[deLoop]);
                    };
                }

                //Find intersection and drop one.
                for (var srcLoop in duplicateArray) {
                    for (var destLoop in duplicateArray) {

                        if (duplicateArray[srcLoop].src_id === duplicateArray[destLoop].dest_id) {
                            if (duplicateArray[srcLoop].dest_id === duplicateArray[destLoop].src_id) {
                                duplicateArray.splice(destLoop, 1);
                                matchObject[key].splice(destLoop, 1);
                            }
                        }
                    }
                }

                //Remove remaining entries from source.
                for (var iSrc in value) {
                    for (var iDest in duplicateArray) {
                        if (_.isEqual(value[iSrc], duplicateArray[iDest])) {
                            value.splice(iSrc, 1);
                        }
                    }
                }

            }

        });

        var returnObject = {
            match: match,
            new_entries: matchObject

        }

        return returnObject;
    }

    function removeSourceMatches(match) {

        var returnMatch = {};

        _.map(match, function (value, matchKey) {

            if (matchKey !== 'demographics') {
                var nonSourceMatch = _.filter(match[matchKey], function (object, objectIndex) {
                    if (object.dest === 'src') {
                        return false;
                    } else {
                        return true;
                    }
                });
                returnMatch[matchKey] = nonSourceMatch;
            } else {
                //No need to filter atomic items.
                returnMatch[matchKey] = value;
            }

        });

        var returnObject = {
            match: returnMatch
        };

        return returnObject;

    }

    //Splice duplicate entries from input array.
    //Add source attribution to matched entries.
    function removeDuplicates(username, match, newRecord, baseRecord, recordID) {

        var newRecord = _.clone(newRecord);

        var duplicateArray = [];

        var newMatch = {};

        _.map(match, function (value, matchKey) {
            if (_.isArray(value)) {
                duplicateArray = _.where(value, {
                    dest: 'dest',
                    match: 'duplicate'
                });

                duplicateNewIndexArray = _.uniq(_.pluck(duplicateArray, 'src_id'));
                duplicateBaseIndexArray = _.uniq(_.pluck(duplicateArray, 'dest_id'));

                if (matchKey === 'social_history') {
                    //console.log(match);
                    //console.log(newRecord.social_history[0]);
                    //console.log(baseRecord.social_history[4]);

                }

                var attributionRecord = _.filter(baseRecord[matchKey], function (object, objectIndex) {
                    if (_.contains(duplicateBaseIndexArray, objectIndex.toString())) {
                        return true;
                    } else {
                        return false;
                    }
                });

                //Update Source attribution.
                async.each(attributionRecord, function (attribution, callback) {
                    record.duplicateEntry(matchKey, username, attribution._id, recordID, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null);
                        }
                    })
                }, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        //callback();
                    }
                });

                //Remove Duplicates from Entry List.
                var returnRecord = _.filter(newRecord[matchKey], function (object, objectIndex) {
                    if (_.contains(duplicateNewIndexArray, objectIndex.toString())) {
                        return false;
                    } else {
                        return true;
                    }
                });

                //Remove Duplicates from Match List.
                //use duplicate new index array to go through matches, and remove.
                var returnMatch = _.filter(match[matchKey], function (object, objectInex) {
                    if (_.contains(duplicateNewIndexArray, object.src_id)) {
                        return false;
                    } else {
                        return true;
                    }
                });

                //console.log(returnMatch);

                //console.log(returnRecord);

                newRecord[matchKey] = returnRecord;

                if (returnMatch === undefined) {
                    returnMatch = [];
                }

                if (returnRecord === undefined) {
                    returnRecord = [];
                }

                newMatch[matchKey] = returnMatch;

            } else {
                if (value.match === 'duplicate' && matchKey === 'demographics') {

                    var attributionRecord = baseRecord[matchKey];

                    async.each(attributionRecord, function (attribution, callback) {
                        record.duplicateEntry(matchKey, username, attribution._id, recordID, function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        })
                    }, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            //callback();
                        }
                    });

                    delete newRecord[matchKey];
                    //delete newMatch[matchKey];
                } else if (matchKey === 'demographics') {
                    newMatch[matchKey] = value;
                }

            }
        });

        _.map(newRecord, function (value, field) {
            if (_.isArray(value)) {
                if (value.length === 0) {
                    delete newRecord[field];
                }
            }
        });

        //console.log(match);

        //console.log(JSON.stringify(newMatch, null, 10));

        //This area can equal undefined on new_record entries for some reason.

        var returnObject = {
            new_record: newRecord,
            new_match: newMatch
        }

        return returnObject;
    }

    //duplicate matches must be purges from queue as well as entries!!!!

    function splitNewPartialEntries(match, newObjectArray, originalNewObjectArray, baseObjectArray) {

        var outputPartialObjectArray = {};
        var outputNewObjectArray = {};

        //console.log(match);

        _.map(match, function (value, matchKey) {

            outputPartialObjectArray[matchKey] = [];
            outputNewObjectArray[matchKey] = [];

            //Need to make sure all entries per src_id are only new.
            newCheckArray = _.where(value, {
                dest: 'dest'
            });

            if (matchKey === 'demographics') {

                if (match[matchKey].match === 'new') {
                    outputNewObjectArray[matchKey] = newObjectArray[matchKey];
                } else if (match[matchKey].match === 'partial') {


                    //console.log(baseObjectArray)

                    var partialOutput = {
                                partial_entry: newObjectArray[matchKey][0],
                                partial_match: match[matchKey],
                                match_entry_id: baseObjectArray[matchKey][0]._id
                    };

                    var multiPartialOutput = {
                        partial_entry: newObjectArray[matchKey][0],
                        partial_matches: [{
                            match_entry: baseObjectArray[matchKey][0]._id,
                            match_object: match[matchKey]
                        }]
                    }

                    //console.log(JSON.stringify(multiPartialOutput, null, 10));

                    //outputPartialObjectArray[matchKey].push(partialOutput);
                    outputPartialObjectArray[matchKey].push(multiPartialOutput);
                }

            } else {

                //If there are no dest records, everything is new.
                if (newCheckArray.length === 0) {

                    if (newObjectArray[matchKey] === undefined) {
                        outputNewObjectArray[matchKey] = [];
                    } else {
                        outputNewObjectArray[matchKey] = newObjectArray[matchKey];
                    }
                }

                var groupCheckedArray = _.groupBy(newCheckArray, 'src_id');

                //if (matchKey === 'social_history') {
                //    console.log(groupCheckedArray);    
                //}
                

                _.each(groupCheckedArray, function (element, index) {
                    var newElementArray = _.filter(element, function (elementItem, elementItemIndex) {
                        if (elementItem.match === 'new') {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    //Only valid entries (src_id) will have equal lengths
                    //Everything else is a partial match as that is all that remains.

                    //console.log(newElementArray.length);
                    //console.log(element.length);

                    if (newElementArray.length !== element.length) {
                        //console.log(newObjectArray[matchKey]);
                        if (newObjectArray[matchKey] !== undefined) {
                            var partialEntry = newObjectArray[matchKey][index];

                            //Need to pare down element object to just partial match entries.
                            //For each partial, grab the associated target entry and source entry.
                            //Return a big list of all matches.
                            //This will result in too many partial source entries being persisted.
                            //Must modify save logic to account for this.

                            //console.log(element);

                            var partialElementArray = _.filter(element, function(elementItem, elementItemIndex) {
                                if (elementItem.match === 'partial') {
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                            //console.log(matchKey);

                            if (matchKey === 'procedures') {
                                //console.log(partialElementArray);
                            }

                            var multiPartialOutput = {
                                partial_entry: partialEntry,
                                partial_matches: []
                            };

                            //console.log(partialElementArray.length);

                            _.each(partialElementArray, function (partialElement, partialIndex) {

                                if (matchKey === 'social_history') {
                                    //console.log(partialElementArray);
                                }

                                //---Dying between lines.
                                var partialOutput = {
                                    partial_entry: partialEntry,
                                    partial_match: partialElement,
                                    match_entry_id: baseObjectArray[matchKey][partialElement.dest_id]._id
                                };
                                //outputPartialObjectArray[matchKey].push(partialOutput);
                                //---

                                var multiPartialMatch = {
                                    match_entry: baseObjectArray[matchKey][partialElement.dest_id]._id,
                                    match_object: partialElement
                                }

                                multiPartialOutput.partial_matches.push(multiPartialMatch);

                            });

                            //console.log(JSON.stringify(multiPartialOutput, null, 10));
                            outputPartialObjectArray[matchKey].push(multiPartialOutput);


                        }
                    } else {
                        if (newObjectArray[matchKey] !== undefined) {

                            var outputNewEntry = originalNewObjectArray[matchKey][element[0].src_id];
                            outputNewObjectArray[matchKey].push(outputNewEntry);
                        }
                    }

                });

            }

        });

        //console.log(outputNewObjectArray);
        //console.log(match.allergies);
        //console.log('---------');
        //console.log(partialObjectArray);
        //console.log('---------');
        //console.log(JSON.stringify(outputPartialObjectArray.social_history, null, 10));

        var returnObject = {
            newEntries: outputNewObjectArray,
            partialEntries: outputPartialObjectArray
        }

        //Weird gap here.
        //console.log(JSON.stringify(returnObject, null, 10));
        //console.log(returnObject);

        return returnObject;

    }

    revertDemographics();

    //Remove Overlapping Source Matches.
    var deDuplicatedSourceRecords = deDuplicateNew(matchResult.match, newObject);

    //Remove All 'src' matches.  Currently not required.
    var nonSourceMatches = removeSourceMatches(deDuplicatedSourceRecords.match);
    //console.log(JSON.stringify(nonSourceMatches, null, 10));

    //Remove Duplicates from save, update Record Entry.

    var deDuplicatedNewRecord = removeDuplicates(username, nonSourceMatches.match, deDuplicatedSourceRecords.new_entries, baseObject, newRecordID);
    //console.log(JSON.stringify(deDuplicatedNewRecord.new_match, null, 10));

    //Split incoming entries into new/partial.
    var splitIncomingEntries = splitNewPartialEntries(deDuplicatedNewRecord.new_match, deDuplicatedNewRecord.new_record, deDuplicatedSourceRecords.new_entries, baseObject);

    //console.log(splitIncomingEntries);

    //console.log(JSON.stringify(splitIncomingEntries));

    //console.log(JSON.stringify(splitIncomingEntries.partialEntries, null, 10));

    //var partialReturnObject = decoratePartial

    //console.log(JSON.stringify(entriesForSave, null, 10));

    callback(null, splitIncomingEntries.newEntries, splitIncomingEntries.partialEntries);

    //console.log(match);

    //removeMatchDuplicates(newObjectForParsing, baseObject, matchResult, newSourceID, function(err, newObjectPostMatch, newPartialObjectPostMatch) {
    //console.log(JSON.stringify(newObjectPostMatch, null, 10));
    //    callback(null, newObjectPostMatch, newPartialObjectPostMatch);
    // });

    /*
    function removeMatchDuplicates(newObject, baseObject, matchResults, newSourceID, callback) {

    function removeMatches(srcMatches, srcArray, baseArray, section, callback) {

        var returnArray = [];
        var returnPartialArray = [];

        function updateDuplicate(section, update_id, callback) {
            record.duplicateEntry(section, 'test', update_id, newSourceID, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }

        var loopCount = 0;
        var loopTotal = srcMatches.length;

        function checkLoopComplete() {

            if (loopCount === loopTotal) {
                callback(null, section, returnArray, returnPartialArray);
            }
        }

        for (var i = 0; i < srcMatches.length; i++) {

            if (srcMatches[i].match === 'duplicate') {

                //If duplicate, don't push to save array and make duplicate entry in log.
                var matchIndex = srcMatches[i].dest_id || 0;
                updateDuplicate(section, baseArray[matchIndex]._id, function (err, resIter) {
                    if (err) {
                        console.error(err);
                    } else {
                        loopCount++;
                        checkLoopComplete();
                    }
                });

            } else if (srcMatches[i].match === 'new') {

                //If new, push the object to the return.

                var tmpSrcIndex = 0;
                if (srcMatches[i].src_id === undefined) {} else {
                    tmpSrcIndex = srcMatches[i].src_id;
                }

                returnArray.push(srcArray[tmpSrcIndex]);

                loopCount++;
                checkLoopComplete();

            } else if (srcMatches[i].match === 'diff') {

                //SHIM:  Holder for 'New' Demographics fix.
                var tmpMatchRecId;
                if (baseArray.length === 0) {
                    tmpMatchRecId = null;
                } else {
                    tmpMatchRecId = baseArray[0]._id;
                }

                var matchObject = srcMatches[i];
                var matchObjForDb = {};
                matchObjForDb.diff = matchObject.diff;
                if (matchObject.subelements) {
                    matchObjForDb.subelements = matchObject.subelements;
                }

                //Diffs always zero, can take only array object.
                returnPartialArray.push({
                    partial_entry: srcArray[0],
                    partial_match: matchObjForDb,
                    match_entry_id: tmpMatchRecId
                });

                loopCount++;
                checkLoopComplete();

            } else if (srcMatches[i].match === 'partial') {

                var matchObject = srcMatches[i];
                var matchObjForDb = {};
                matchObjForDb.diff = matchObject.diff;
                matchObjForDb.percent = matchObject.percent;
                if (matchObject.subelements) {
                    matchObjForDb.subelements = matchObject.subelements;
                }

                returnPartialArray.push({
                    partial_entry: srcArray[srcMatches[i].src_id],
                    partial_match: matchObjForDb,
                    match_entry_id: baseArray[srcMatches[i].dest_id]._id
                });

                loopCount++;
                checkLoopComplete();
            }
        }

    }

    //Loop all sections.
    var sectionIter = 0;
    var sectionTotal = 0;
    for (var iSecCnt in newObject) {
        sectionTotal++;

    }

    var newPartialObject = {};

    function checkSectionLoopComplete(iteration, totalSections) {
        if (iteration === (sectionTotal)) {
            //console.log('newObject');
            //console.log(newObject);
            callback(null, newObject, newPartialObject);
        }
    }

    for (var iSec in newObject) {

        //console.log(JSON.stringify(newObject[iSec], null, 10));

        var currentMatchResult = matchResults.match[iSec];
        if (currentMatchResult.length > 0) {
            removeMatches(currentMatchResult, newObject[iSec], baseObject[iSec], iSec, function (err, returnSection, newEntries, newPartialEntries) {
                //New entries is fine...
                //console.log('newEntries');
                //console.log(newEntries);
                newObject[returnSection] = newEntries;
                if (newPartialEntries.length > 0) {
                    newPartialObject[returnSection] = {};
                    newPartialObject[returnSection] = newPartialEntries;
                }
                sectionIter++;
                checkSectionLoopComplete(sectionIter, sectionTotal);
            });
        } else {
            sectionIter++;
            checkSectionLoopComplete(sectionIter, sectionTotal);
        }
    }
}
*/


}

module.exports.reconcile = reconcile;
