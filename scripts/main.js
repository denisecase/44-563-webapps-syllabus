$(function () {

  const found = new Mark(".content");
  const inputElement = $("input[type='text']");
  const btnClear = $("#reset");
  const btnCount = $("#count");

  /**
  * Assign clear handler
  */
  btnClear.on("click", function () {
    inputElement.val("").focus()
    found.unmark()
  })

  /**
   * Search on input
   */
  inputElement.on("input", function () {
    const searchVal = this.value;
    found.unmark({
      done: () => {
        found.mark(searchVal, {
          separateWordSearch: true,
          done: (counter) => {
            btnCount.html(counter.toString())
          }
        })
      }
    })
  })


})

