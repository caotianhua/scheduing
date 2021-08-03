export function getResPersonnelData (data, fzarry) {
  // console.log(sortClass(data))
  let resFZArry = reorganizationGrouping(fzarry)

  if (data) {
    // 此处重组排班数组
    data.map((per, index) => {
      resFZArry.map((per2, index2) => {
        if (per.fzmc === per2.fzmc) {
          per.id = per.yhid //  右侧数据与表格关联
          per2.fzArry.push(per)
        } else return false
      })
    })
    // 此处给排班分组数组中数据为空的的赋值一个占位数据
    resFZArry.map((per3, index3) => {
      console.log(per3)
      if (per3.fzArry.length === 0) {
        let emptyobj = {
          "bcmc": null,
          "xm": "",
          "mon": null,
          "tue": null,
          "wed": null,
          "thu": null,
          "fri": null,
          "sat": null,
          "sun": null,
          "sqgs": 0,
          "sqgsTotal": null,
          "fzmc": per3.fzmc,
          "fzgc": null,
          "hsnjmc": "",
          "yhid": "",
          "jhid": null,
          "ksid": null,
          "jhsj": null,
          "bz": null
        }
        per3.fzArry.push(emptyobj)
      } else return false
    })
  }
  console.log(resFZArry)
  // let resdata = sortClass(data)
  // let arry = []
  // resdata.map((per3, index2) => {
  //   per3.fzArry.map((per4, index3) => {
  //     // console.log(per4)
  //     per4.id = per4.yhid
  //     if (!per4.weeks) {
  //       per4.weeks = []
  //     }
  //     arry.push(per4)
  //   })
  // })
  return resFZArry
}
// const convert = per => {
//   // console.log(per)
//   if (per) {
//   }
// }
function reorganizationGrouping (arry) {
  console.log(arry)
  let newarry = []
  if (arry) {
    arry.map(per => {
      let obj = {
        fzmc: per.fzmc,
        id: per.fzmc,
        fzArry: []
      }
      newarry.push(obj)
    })
  }
  return newarry
}
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
export function getMoveupdown (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}