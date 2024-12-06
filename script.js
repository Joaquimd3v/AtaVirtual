// Inicializa um array para armazenar os registros de presença
let attendanceRecords = [];

// Função para atualizar a tabela com os registros de presença
function updateAttendanceTable() {
    const tableBody = document.getElementById('attendance-records').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Limpar registros existentes

    // Adicionar cada registro de presença à tabela
    attendanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.status}</td>
            <td>${record.date}</td>
            <td>${record.exitTime || '-'}</td> <!-- Exibir hora de saída, caso exista -->
            <td>${record.justification || '-'}</td> <!-- Exibir justificativa, caso exista -->
        `;
        tableBody.appendChild(row);
    });

    // Atualizar o resumo de presença
    updateAttendanceSummary();
}

// Função para atualizar o resumo de presença
function updateAttendanceSummary() {
    const totalStudents = attendanceRecords.length;
    const totalPresente = attendanceRecords.filter(record => record.status === 'Presente').length;
    const totalAusente = totalStudents - totalPresente;

    document.getElementById('total-students').innerText = totalStudents;
    document.getElementById('total-present').innerText = totalPresente;
    document.getElementById('total-absent').innerText = totalAusente;
}

// Manipulador de envio do formulário
document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores do formulário
    const studentName = document.getElementById('student-name').value.trim();
    const attendanceStatus = document.getElementById('attendance-status').value;  
    const exitTime = document.getElementById('exit-time').value;  
    const justification = document.getElementById('justification').value.trim();

    if (studentName === '') {
        alert('Por favor, insira o nome do aluno.');
        return;
    }

    if (attendanceStatus === '') {
        alert('Por favor, selecione o status de presença (Presente/Faltou).');
        return;
    }

    // Criar um novo registro
    const record = {
        name: studentName,
        status: attendanceStatus === 'Present' ? 'Presente' : 'Faltou',  // Status em português
        date: new Date().toLocaleDateString(),
        exitTime: exitTime,  
        justification: justification || '-'  
    };

    // Adicionar o registro ao array de registros de presença
    attendanceRecords.push(record);

    // Atualizar a tabela e o resumo
    updateAttendanceTable();

    // Resetar o formulário
    document.getElementById('attendance-form').reset();
});
