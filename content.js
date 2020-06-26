function addButtonToPage() {
  // 1. Create the button
  const button = document.createElement("button")
  button.innerHTML = "Alchemy Please Merge"
  button.id = "alchemy_merge_button"
  button.classList.add("btn")
  button.classList.add("btn-primary")

  // 2. Place next to Comment
  const buttons = [].slice.call(document.querySelectorAll("button.btn-primary")).filter(button => button.textContent.match("Comment"))
  const commentButton = buttons[buttons.length - 1]
  commentButton.parentNode.appendChild(button)

  // 3. Add event handler
  button.addEventListener("click", function (e) {
    e.preventDefault()
    const newCommentField = document.querySelector("#new_comment_field")
    newCommentField.value = "alchemy please merge"
    newCommentField.form.submit()
    newCommentField.value = ""
  })

  return button
}

function didPassCI() {
  const status = document.evaluate("//span[contains(., '1 pending and 3 successful checks')]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
  return status.innerText.includes("1 pending and 3 successful checks")
}

function isApproved() {
  const approval = document.querySelector(".mergeability-details").querySelector(".status-heading")
  return approval.innerText.includes("Changes approved")
}

(function () {
  const button = addButtonToPage()

  setInterval(function () {
    const approved = isApproved()
    const passedCI = didPassCI()
    const mergeable = passedCI && approved

    // console.log(`PR mergeable? ${mergeable} - Passed CI? ${passedCI} / Approved? ${approved}`)

    button.disabled = !mergeable
  }, 1000)
})()
