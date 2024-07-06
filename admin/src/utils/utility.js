export const getTagsInArray = (tags) => {
    return tags.split(',')
}

export const trimDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
        return description;
    } else {
        return description.substring(0, maxLength - 3) + "...";
    }
}
