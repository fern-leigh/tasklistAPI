function getCurrentDate() {
    const unforamttedDate = new Date(Date.now()); 
    const date = unforamttedDate.getDate();
    const month = unforamttedDate.getMonth();
    const year = unforamttedDate.getFullYear();
    return `${date}/${month+1}/${year}`
}

module.exports = {
    getCurrentDate
  };