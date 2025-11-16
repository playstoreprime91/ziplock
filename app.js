import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://iwyqkpvbvgvymwuhntof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eXFrcHZidmd2eW13dWhudG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjgzNDcsImV4cCI6MjA3ODgwNDM0N30.e3tP6GRqXsliKn1Nkl9Uc8vueaeFHbM1hGe7nhCrnds";

const supabase = createClient(supabaseUrl, supabaseKey);

// -----------------------
//   DODAWANIE ZADANIA
// -----------------------
async function addTask() {
  const title = document.getElementById("newTitle").value;

  if (!title.trim()) return;

  await supabase.from("tasks").insert([{ title }]);

  document.getElementById("newTitle").value = "";
  loadTasks();
}

// -----------------------
//   USUWANIE ZADANIA
// -----------------------
async function deleteTask(id) {
  await supabase.from("tasks").delete().eq("id", id);
  loadTasks();
}

// -----------------------
//   WYSWIETLANIE LISTY
// -----------------------
async function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  data.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title + " ";

    const btn = document.createElement("button");
    btn.textContent = "Usuń";
    btn.onclick = () => deleteTask(task.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// -----------------------
//   UDOSTĘPNIENIE FUNKCJI
// -----------------------
window.addTask = addTask;
window.deleteTask = deleteTask;

loadTasks();
