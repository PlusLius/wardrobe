export default () => fetch('/comments/show?id=41935867588333502&page=1').then(data => data.json()).then(data => {
      console.log(data)
})
