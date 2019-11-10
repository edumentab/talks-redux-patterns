export function makeFileList(sourceData, version) {
  const files = Object.values(sourceData.files)
    .sort(fileSorter)
    .filter(f => f.versions[version])
    .map(f => {
      const fileV = f.versions[version]
      return {
        name: f.name || '',
        state: fileV.state,
        hasComment: !!fileV.editComment,
        content: f.raw[fileV.which]
      }
    })

  const groups = files.reduce(
    (memo, f) => {
      if (f.state === 'created') memo.created.push(f)
      else if (f.state === 'deleted') memo.deleted.push(f)
      else if (
        f.state === 'initial' ||
        f.state === 'eternal' ||
        f.state === 'unchanged'
      )
        memo.untouched.push(f)
      else if (f.state === 'nonexistent') memo.nonexistent.push(f)
      else memo.touched.push(f)
      return memo
    },
    {
      created: [],
      touched: [],
      deleted: [],
      untouched: [],
      nonexistent: []
    }
  )

  return Object.entries(groups)
    .filter(([group, members]) => members.length)
    .map(([group, members], gIdx) =>
      members.map((m, n) => ({ ...m, group, firstInGroup: gIdx && !n }))
    )
    .flatMap(a => a)
}

const fileSorter = (o1, o2) => (o1.name < o2.name ? -1 : 1)
