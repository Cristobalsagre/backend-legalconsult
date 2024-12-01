const handleUserManagement = require('./userController').handleUserManagement;
const handleConsultaManagement = require('./consultaController').handleConsultaManagement;
const handleAssignLawyer = require('./lawyerController').handleAssignLawyer;
const handleMessageQueue = require('./mensajeController').handleMessageQueue;
const handleProgressReports = require('./reporteController').handleProgressReports;
const handleCaseEvaluations = require('./evaluationController').handleCaseEvaluations;
const handleSatisfactionReports = require('./satisfactionReportController').handleSatisfactionReports;
const handleLawyerAgendas = require('./agendaController').handleLawyerAgendas;

module.exports = {
    handleUserManagement,
    handleConsultaManagement,
    handleAssignLawyer,
    handleMessageQueue,
    handleProgressReports,
    handleCaseEvaluations,
    handleSatisfactionReports,
    handleLawyerAgendas,
};