// 1. Create the button
const button = document.createElement("button")
button.innerHTML = "Alchemy Please Merge"
button.classList.add("btn")
button.classList.add("btn-primary")

// 2. Place next to Comment
const commentButton = document.evaluate("//button[contains(., 'Comment')]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
commentButton.parentNode.appendChild(button)

// 3. Add event handler
button.addEventListener ("click", function(e) {
  e.preventDefault()
  const newCommentField = document.querySelector("#new_comment_field")
  newCommentField.value = "alchemy please merge"
  newCommentField.form.submit()
  newCommentField.value = ""
})

setInterval(function() {
  const status = document.querySelector(".mergeability-details").querySelector(".status-meta")
  const mergeable = status.innerText === "1 pending and 3 successful checks"

  button.disabled = !mergeable
},1000)