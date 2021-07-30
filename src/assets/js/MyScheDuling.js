export function getResPersonnelData (data) {
  // console.log(sortClass(data))
  let resdata = sortClass(data)
  // resdata.map((per, index) => {
  //   // convert(per)
  //   if (per) {
  //     let count = per.length
  //     per.map((per2, index2) => {
  //       per2.connt = count
  //     })
  //   }
  // })
  // console.log(resdata)
  // return resdata
  // console.log(resdata)
  let arry = []
  resdata.map((per3, index2) => {
    per3.fzArry.map((per4, index3) => {
      // console.log(per4)
      per4.id = per4.yhid
      if (!per4.weeks) {
        per4.weeks = []
      }
      arry.push(per4)
    })
  })
  // console.log(arry)
  // return arry
  return resdata
}
// const convert = per => {
//   // console.log(per)
//   if (per) {
//   }
// }
function sortClass (sortData) {
  const groupBy = (array, f) => {
    let groups = {}
    array.forEach((o) => {
      // let group = JSON.stringify(f(o));
      let group = f(o)
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    return Object.keys(groups).map((group) => {
      let obj = {
        fzmc: group,
        id: group,
        fzArry: groups[group]
      }
      // console.log(groups, group)
      // return groups[group]
      return obj
      // return groups;
    })
  }
  const sorted = groupBy(sortData, (item) => {
    return item.fzmc // 返回需要分组的对象
  })
  return sorted
}