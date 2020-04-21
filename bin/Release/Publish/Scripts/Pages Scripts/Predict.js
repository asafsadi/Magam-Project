

//translate product to indexes
ItemToIndex = [{
    "Items": {
        "מסוע חדש": 1,
        "ח.מסוע 3 שכבות": 2,
        "ח.מסוע 2 שכבות": 3,
        "מ.מסוע 3 שכבות": 4
    }
}];

//number of hollidays in each month
hollidaysInMonths = [{
    1: 1,
    2: 1,
    3: 2,
    4: 3,
    5: 1,
    6: 1,
    7: 1,
    8: 3,
    9: 2,
    10: 2,
    11: 1,
    12: 1,
}];


//A decision tree model based on 1000 previous inites which predict weather an order will arrive on time based on the following features: catalogNumber, supplyTime, length, hollidays, materialsInInventory.
function predictIsOnTime(catalogNumber, supplyTime, length, hollidays, materialsInInventory) {
    if (catalogNumber == null) {
        return "Probably";
    }
    else if (catalogNumber > 2) {
        if (supplyTime == null) {
            return "Probably";
        }
        else if (supplyTime > 2) {
            if (hollidays == null) {
                return "YES";
            }
            else if (hollidays > 2) {
                if (materialsInInventory == null) {
                    return "Probably";
                }
                else if (materialsInInventory > 3) {
                    if (hollidays > 3) {
                        if (supplyTime > 3) {
                            return "YES";
                        }
                        else if (supplyTime <= 3) {
                            return "Probably";
                        }
                    }
                    else if (hollidays <= 3) {
                        return "YES";
                    }
                }
                else if (materialsInInventory <= 3) {
                    if (materialsInInventory > 2) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 2) {
                            return "Probably";
                        }
                        else if (length <= 2) {
                            if (supplyTime > 3) {
                                return "YES";
                            }
                            else if (supplyTime <= 3) {
                                if (hollidays > 3) {
                                    return "Probably";
                                }
                                else if (hollidays <= 3) {
                                    if (catalogNumber > 3) {
                                        return "YES";
                                    }
                                    else if (catalogNumber <= 3) {
                                        return "Probably";
                                    }
                                }
                            }
                        }
                    }
                    else if (materialsInInventory <= 2) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 1) {
                            if (supplyTime > 3) {
                                if (catalogNumber > 3) {
                                    if (hollidays > 3) {
                                        if (materialsInInventory > 1) {
                                            return "Probably";
                                        }
                                        else if (materialsInInventory <= 1) {
                                            return "Unlikely";
                                        }
                                    }
                                    else if (hollidays <= 3) {
                                        return "Probably";
                                    }
                                }
                                else if (catalogNumber <= 3) {
                                    return "Probably";
                                }
                            }
                            else if (supplyTime <= 3) {
                                if (catalogNumber > 3) {
                                    return "Probably";
                                }
                                else if (catalogNumber <= 3) {
                                    if (length > 2) {
                                        return "Unlikely";
                                    }
                                    else if (length <= 2) {
                                        return "Unlikely";
                                    }
                                }
                            }
                        }
                        else if (length <= 1) {
                            if (catalogNumber > 3) {
                                return "Probably";
                            }
                            else if (catalogNumber <= 3) {
                                return "Probably";
                            }
                        }
                    }
                }
            }
            else if (hollidays <= 2) {
                if (materialsInInventory == null) {
                    return "YES";
                }
                else if (materialsInInventory > 1) {
                    if (length == null) {
                        return "YES";
                    }
                    else if (length > 1) {
                        if (materialsInInventory > 3) {
                            return "YES";
                        }
                        else if (materialsInInventory <= 3) {
                            if (supplyTime > 3) {
                                if (materialsInInventory > 2) {
                                    return "YES";
                                }
                                else if (materialsInInventory <= 2) {
                                    return "YES";
                                }
                            }
                            else if (supplyTime <= 3) {
                                if (hollidays > 1) {
                                    if (catalogNumber > 3) {
                                        if (materialsInInventory > 2) {
                                            return "YES";
                                        }
                                        else if (materialsInInventory <= 2) {
                                            return "Probably";
                                        }
                                    }
                                    else if (catalogNumber <= 3) {
                                        return "Probably";
                                    }
                                }
                                else if (hollidays <= 1) {
                                    return "YES";
                                }
                            }
                        }
                    }
                    else if (length <= 1) {
                        return "YES";
                    }
                }
                else if (materialsInInventory <= 1) {
                    if (length == null) {
                        return "Probably";
                    }
                    else if (length > 1) {
                        if (supplyTime > 3) {
                            if (catalogNumber > 3) {
                                if (hollidays > 1) {
                                    return "Probably";
                                }
                                else if (hollidays <= 1) {
                                    return "YES";
                                }
                            }
                            else if (catalogNumber <= 3) {
                                return "Probably";
                            }
                        }
                        else if (supplyTime <= 3) {
                            return "Probably";
                        }
                    }
                    else if (length <= 1) {
                        if (catalogNumber > 3) {
                            return "YES";
                        }
                        else if (catalogNumber <= 3) {
                            if (supplyTime > 3) {
                                if (hollidays > 1) {
                                    return "Probably";
                                }
                                else if (hollidays <= 1) {
                                    return "YES";
                                }
                            }
                            else if (supplyTime <= 3) {
                                return "Probably";
                            }
                        }
                    }
                }
            }
        }
        else if (supplyTime <= 2) {
            if (hollidays == null) {
                return "Probably";
            }
            else if (hollidays > 2) {
                if (materialsInInventory == null) {
                    return "NO";
                }
                else if (materialsInInventory > 3) {
                    if (supplyTime > 1) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 1) {
                            return "Probably";
                        }
                        else if (length <= 1) {
                            return "Probably";
                        }
                    }
                    else if (supplyTime <= 1) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 2) {
                            return "Unlikely";
                        }
                        else if (length <= 2) {
                            if (length > 1) {
                                if (hollidays > 3) {
                                    return "Unlikely";
                                }
                                else if (hollidays <= 3) {
                                    return "Probably";
                                }
                            }
                            else if (length <= 1) {
                                return "Probably";
                            }
                        }
                    }
                }
                else if (materialsInInventory <= 3) {
                    if (materialsInInventory > 1) {
                        if (hollidays > 3) {
                            if (materialsInInventory > 2) {
                                if (length == null) {
                                    return "Unlikely";
                                }
                                else if (length > 1) {
                                    if (supplyTime > 1) {
                                        return "Unlikely";
                                    }
                                    else if (supplyTime <= 1) {
                                        return "NO";
                                    }
                                }
                                else if (length <= 1) {
                                    if (supplyTime > 1) {
                                        return "Probably";
                                    }
                                    else if (supplyTime <= 1) {
                                        return "Unlikely";
                                    }
                                }
                            }
                            else if (materialsInInventory <= 2) {
                                if (length == null) {
                                    return "NO";
                                }
                                else if (length > 1) {
                                    return "NO";
                                }
                                else if (length <= 1) {
                                    if (supplyTime > 1) {
                                        return "Unlikely";
                                    }
                                    else if (supplyTime <= 1) {
                                        return "NO";
                                    }
                                }
                            }
                        }
                        else if (hollidays <= 3) {
                            if (materialsInInventory > 2) {
                                if (supplyTime > 1) {
                                    return "Probably";
                                }
                                else if (supplyTime <= 1) {
                                    return "Unlikely";
                                }
                            }
                            else if (materialsInInventory <= 2) {
                                if (supplyTime > 1) {
                                    if (length == null) {
                                        return "Unlikely";
                                    }
                                    else if (length > 1) {
                                        return "Unlikely";
                                    }
                                    else if (length <= 1) {
                                        return "Probably";
                                    }
                                }
                                else if (supplyTime <= 1) {
                                    if (length == null) {
                                        return "NO";
                                    }
                                    else if (length > 1) {
                                        return "NO";
                                    }
                                    else if (length <= 1) {
                                        return "Unlikely";
                                    }
                                }
                            }
                        }
                    }
                    else if (materialsInInventory <= 1) {
                        if (length == null) {
                            return "NO";
                        }
                        else if (length > 1) {
                            return "NO";
                        }
                        else if (length <= 1) {
                            if (hollidays > 3) {
                                return "NO";
                            }
                            else if (hollidays <= 3) {
                                return "Unlikely";
                            }
                        }
                    }
                }
            }
            else if (hollidays <= 2) {
                if (materialsInInventory == null) {
                    return "Probably";
                }
                else if (materialsInInventory > 1) {
                    if (supplyTime > 1) {
                        if (catalogNumber > 3) {
                            if (hollidays > 1) {
                                if (materialsInInventory > 3) {
                                    return "YES";
                                }
                                else if (materialsInInventory <= 3) {
                                    if (length == null) {
                                        return "Probably";
                                    }
                                    else if (length > 1) {
                                        return "Probably";
                                    }
                                    else if (length <= 1) {
                                        return "YES";
                                    }
                                }
                            }
                            else if (hollidays <= 1) {
                                return "YES";
                            }
                        }
                        else if (catalogNumber <= 3) {
                            if (hollidays > 1) {
                                return "Probably";
                            }
                            else if (hollidays <= 1) {
                                if (materialsInInventory > 3) {
                                    return "YES";
                                }
                                else if (materialsInInventory <= 3) {
                                    if (length == null) {
                                        return "Probably";
                                    }
                                    else if (length > 1) {
                                        return "Probably";
                                    }
                                    else if (length <= 1) {
                                        if (materialsInInventory > 2) {
                                            return "YES";
                                        }
                                        else if (materialsInInventory <= 2) {
                                            return "Probably";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (supplyTime <= 1) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 1) {
                            if (materialsInInventory > 2) {
                                if (length > 2) {
                                    if (materialsInInventory > 3) {
                                        return "Probably";
                                    }
                                    else if (materialsInInventory <= 3) {
                                        if (catalogNumber > 3) {
                                            return "Probably";
                                        }
                                        else if (catalogNumber <= 3) {
                                            return "Unlikely";
                                        }
                                    }
                                }
                                else if (length <= 2) {
                                    return "Probably";
                                }
                            }
                            else if (materialsInInventory <= 2) {
                                if (catalogNumber > 3) {
                                    if (hollidays > 1) {
                                        return "Unlikely";
                                    }
                                    else if (hollidays <= 1) {
                                        return "Probably";
                                    }
                                }
                                else if (catalogNumber <= 3) {
                                    return "Unlikely";
                                }
                            }
                        }
                        else if (length <= 1) {
                            if (materialsInInventory > 3) {
                                if (catalogNumber > 3) {
                                    return "YES";
                                }
                                else if (catalogNumber <= 3) {
                                    return "Probably";
                                }
                            }
                            else if (materialsInInventory <= 3) {
                                return "Probably";
                            }
                        }
                    }
                }
                else if (materialsInInventory <= 1) {
                    if (supplyTime > 1) {
                        if (hollidays > 1) {
                            return "Unlikely";
                        }
                        else if (hollidays <= 1) {
                            return "Probably";
                        }
                    }
                    else if (supplyTime <= 1) {
                        if (hollidays > 1) {
                            return "NO";
                        }
                        else if (hollidays <= 1) {
                            return "Unlikely";
                        }
                    }
                }
            }
        }
    }
    else if (catalogNumber <= 2) {
        if (supplyTime == null) {
            return "Unlikely";
        }
        else if (supplyTime > 2) {
            if (materialsInInventory == null) {
                return "Probably";
            }
            else if (materialsInInventory > 2) {
                if (catalogNumber > 1) {
                    if (hollidays == null) {
                        return "Probably";
                    }
                    else if (hollidays > 1) {
                        return "Probably";
                    }
                    else if (hollidays <= 1) {
                        if (supplyTime > 3) {
                            return "YES";
                        }
                        else if (supplyTime <= 3) {
                            return "Probably";
                        }
                    }
                }
                else if (catalogNumber <= 1) {
                    if (hollidays == null) {
                        return "Probably";
                    }
                    else if (hollidays > 3) {
                        if (supplyTime > 3) {
                            if (materialsInInventory > 3) {
                                return "Probably";
                            }
                            else if (materialsInInventory <= 3) {
                                return "Unlikely";
                            }
                        }
                        else if (supplyTime <= 3) {
                            return "Unlikely";
                        }
                    }
                    else if (hollidays <= 3) {
                        if (supplyTime > 3) {
                            return "Probably";
                        }
                        else if (supplyTime <= 3) {
                            if (hollidays > 1) {
                                if (length == null) {
                                    return "Probably";
                                }
                                else if (length > 2) {
                                    return "Unlikely";
                                }
                                else if (length <= 2) {
                                    return "Probably";
                                }
                            }
                            else if (hollidays <= 1) {
                                return "Probably";
                            }
                        }
                    }
                }
            }
            else if (materialsInInventory <= 2) {
                if (catalogNumber > 1) {
                    if (hollidays == null) {
                        return "Probably";
                    }
                    else if (hollidays > 2) {
                        if (materialsInInventory > 1) {
                            if (supplyTime > 3) {
                                return "Probably";
                            }
                            else if (supplyTime <= 3) {
                                if (length == null) {
                                    return "Probably";
                                }
                                else if (length > 2) {
                                    return "Unlikely";
                                }
                                else if (length <= 2) {
                                    if (hollidays > 3) {
                                        return "Unlikely";
                                    }
                                    else if (hollidays <= 3) {
                                        return "Probably";
                                    }
                                }
                            }
                        }
                        else if (materialsInInventory <= 1) {
                            if (supplyTime > 3) {
                                if (length == null) {
                                    return "Unlikely";
                                }
                                else if (length > 1) {
                                    return "Unlikely";
                                }
                                else if (length <= 1) {
                                    if (hollidays > 3) {
                                        return "Unlikely";
                                    }
                                    else if (hollidays <= 3) {
                                        return "Probably";
                                    }
                                }
                            }
                            else if (supplyTime <= 3) {
                                return "Unlikely";
                            }
                        }
                    }
                    else if (hollidays <= 2) {
                        if (supplyTime > 3) {
                            return "Probably";
                        }
                        else if (supplyTime <= 3) {
                            if (length == null) {
                                return "Probably";
                            }
                            else if (length > 1) {
                                if (hollidays > 1) {
                                    return "Unlikely";
                                }
                                else if (hollidays <= 1) {
                                    return "Probably";
                                }
                            }
                            else if (length <= 1) {
                                return "Probably";
                            }
                        }
                    }
                }
                else if (catalogNumber <= 1) {
                    if (hollidays == null) {
                        return "Unlikely";
                    }
                    else if (hollidays > 1) {
                        if (length == null) {
                            return "Unlikely";
                        }
                        else if (length > 2) {
                            if (hollidays > 3) {
                                return "NO";
                            }
                            else if (hollidays <= 3) {
                                return "Unlikely";
                            }
                        }
                        else if (length <= 2) {
                            return "Unlikely";
                        }
                    }
                    else if (hollidays <= 1) {
                        if (length == null) {
                            return "Probably";
                        }
                        else if (length > 2) {
                            return "Unlikely";
                        }
                        else if (length <= 2) {
                            if (supplyTime > 3) {
                                return "Probably";
                            }
                            else if (supplyTime <= 3) {
                                if (length > 1) {
                                    return "Unlikely";
                                }
                                else if (length <= 1) {
                                    if (materialsInInventory > 1) {
                                        return "Probably";
                                    }
                                    else if (materialsInInventory <= 1) {
                                        return "Unlikely";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (supplyTime <= 2) {
            if (materialsInInventory == null) {
                return "Unlikely";
            }
            else if (materialsInInventory > 2) {
                if (hollidays == null) {
                    return "Unlikely";
                }
                else if (hollidays > 2) {
                    if (supplyTime > 1) {
                        if (catalogNumber > 1) {
                            if (materialsInInventory > 3) {
                                return "Probably";
                            }
                            else if (materialsInInventory <= 3) {
                                if (length == null) {
                                    return "Unlikely";
                                }
                                else if (length > 1) {
                                    return "Unlikely";
                                }
                                else if (length <= 1) {
                                    if (hollidays > 3) {
                                        return "Unlikely";
                                    }
                                    else if (hollidays <= 3) {
                                        return "Probably";
                                    }
                                }
                            }
                        }
                        else if (catalogNumber <= 1) {
                            return "Unlikely";
                        }
                    }
                    else if (supplyTime <= 1) {
                        if (hollidays > 3) {
                            if (materialsInInventory > 3) {
                                return "Unlikely";
                            }
                            else if (materialsInInventory <= 3) {
                                if (length == null) {
                                    return "Unlikely";
                                }
                                else if (length > 1) {
                                    return "NO";
                                }
                                else if (length <= 1) {
                                    return "Unlikely";
                                }
                            }
                        }
                        else if (hollidays <= 3) {
                            if (length == null) {
                                return "Unlikely";
                            }
                            else if (length > 1) {
                                return "Unlikely";
                            }
                            else if (length <= 1) {
                                return "Unlikely";
                            }
                        }
                    }
                }
                else if (hollidays <= 2) {
                    if (catalogNumber > 1) {
                        if (materialsInInventory > 3) {
                            return "Probably";
                        }
                        else if (materialsInInventory <= 3) {
                            if (length == null) {
                                return "Probably";
                            }
                            else if (length > 1) {
                                if (hollidays > 1) {
                                    if (supplyTime > 1) {
                                        return "Probably";
                                    }
                                    else if (supplyTime <= 1) {
                                        return "Unlikely";
                                    }
                                }
                                else if (hollidays <= 1) {
                                    return "Probably";
                                }
                            }
                            else if (length <= 1) {
                                return "Probably";
                            }
                        }
                    }
                    else if (catalogNumber <= 1) {
                        if (hollidays > 1) {
                            if (length == null) {
                                return "Unlikely";
                            }
                            else if (length > 1) {
                                return "Unlikely";
                            }
                            else if (length <= 1) {
                                return "Unlikely";
                            }
                        }
                        else if (hollidays <= 1) {
                            if (length == null) {
                                return "Probably";
                            }
                            else if (length > 1) {
                                if (materialsInInventory > 3) {
                                    if (supplyTime > 1) {
                                        return "Probably";
                                    }
                                    else if (supplyTime <= 1) {
                                        return "Unlikely";
                                    }
                                }
                                else if (materialsInInventory <= 3) {
                                    return "Unlikely";
                                }
                            }
                            else if (length <= 1) {
                                return "Probably";
                            }
                        }
                    }
                }
            }
            else if (materialsInInventory <= 2) {
                if (hollidays == null) {
                    return "Unlikely";
                }
                else if (hollidays > 2) {
                    if (hollidays > 3) {
                        return "NO";
                    }
                    else if (hollidays <= 3) {
                        if (supplyTime > 1) {
                            if (materialsInInventory > 1) {
                                return "Unlikely";
                            }
                            else if (materialsInInventory <= 1) {
                                if (length == null) {
                                    return "NO";
                                }
                                else if (length > 1) {
                                    return "NO";
                                }
                                else if (length <= 1) {
                                    return "Unlikely";
                                }
                            }
                        }
                        else if (supplyTime <= 1) {
                            return "NO";
                        }
                    }
                }
                else if (hollidays <= 2) {
                    if (hollidays > 1) {
                        if (materialsInInventory > 1) {
                            return "Unlikely";
                        }
                        else if (materialsInInventory <= 1) {
                            if (supplyTime > 1) {
                                return "Unlikely";
                            }
                            else if (supplyTime <= 1) {
                                return "NO";
                            }
                        }
                    }
                    else if (hollidays <= 1) {
                        if (supplyTime > 1) {
                            if (catalogNumber > 1) {
                                if (materialsInInventory > 1) {
                                    return "Probably";
                                }
                                else if (materialsInInventory <= 1) {
                                    if (length == null) {
                                        return "Unlikely";
                                    }
                                    else if (length > 1) {
                                        return "Unlikely";
                                    }
                                    else if (length <= 1) {
                                        return "Probably";
                                    }
                                }
                            }
                            else if (catalogNumber <= 1) {
                                return "Unlikely";
                            }
                        }
                        else if (supplyTime <= 1) {
                            return "Unlikely";
                        }
                    }
                }
            }
        }
    }
    return null;
}