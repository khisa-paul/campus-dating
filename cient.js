const API = "https://campus-dating-backend-1.onrender.com";
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  const res = await fetch(`${API}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message || result.error);
});

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch(`${API}/api/createPost`, {
    method: "POST",
    body: formData
  });
  const post = await res.json();
  alert("Post created");
  loadPosts();
});

async function loadPosts() {
  const res = await fetch(`${API}/api/posts`);
  const posts = await res.json();
  document.getElementById("posts").innerHTML = posts.map(p => `
    <p><b>${p.user.name}</b>: ${p.text} <br>
    ${p.photo ? `<img src="${p.photo}" width="100">` : ""}
    </p>
  `).join("");
}
loadPosts();

