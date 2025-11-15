import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = "https://iwyqkpvbvgvymwuhntof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eXFrcHZidmd2eW13dWhudG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjgzNDcsImV4cCI6MjA3ODgwNDM0N30.e3tP6GRqXsliKn1Nkl9Uc8vueaeFHbM1hGe7nhCrnds";

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CREATE ---
async function addTask() {
    const title = document.getElementById("newTitle").value;

    if (!title) return;

    await supabase.from('tasks').insert([{ title }]);
    document.getElementById("newTitle").value = "";
    loadTasks();
}

// --- READ ---
async function loadTasks() {
    const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${task.id}, ${!task.done})">
            ${task.title}
            <button onclick="deleteTask(${task.id})">Usuń</button>
        `;

        list.appendChild(li);
    });
}

// --- UPDATE ---
async function toggleTask(id, done) {
    await supabase
        .from('tasks')
        .update({ done })
        .eq('id', id);

    loadTasks();
}

// --- DELETE ---
async function deleteTask(id) {
    await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

    loadTasks();
}

loadTasks();
