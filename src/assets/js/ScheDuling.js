export function getScheDulingTableData (data) {
  let resdata = sortClass(data)
  // resdata.map((per, index) => {
  //   if (per) {
  //     let count = per.length
  //     per.map((per2, index2) => {
  //       per2.connt = count
  //     })
  //   }
  //   // console.log(per)
  // })
  // console.log(resdata)
  // return resdata
  // 给所有的排班人员信息加上ID与日历联动
  resdata.map((per3, index2) => {
    // console.log(per3)
    per3.fzArry.map((per4, index3) => {
      // console.log(per4)
      per4.Id = per4.xm
    })
  })
  // console.log(resdata)
  // let arry = []
  // resdata.map((per3, index2) => {
  //   per3.map((per4, index3) => {
  //     arry.push(per4)
  //   })
  // })
  // console.log(arry)
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
      // console.log(groups[group])
      // group.id = group.yhid
      let obj = {
        fzmc: group,
        id: group,
        fzArry: groups[group]
      }
      // console.log(groups, group)
      // return groups[group];
      return obj
    })
  }
  const sorted = groupBy(sortData, (item) => {
    return item.fzmc // 返回需要分组的对象
  })
  return sorted
}