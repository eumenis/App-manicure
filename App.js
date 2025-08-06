import { useState, useEffect } from 'react';
import {
  CalendarDays,
  Gem,
  LogOut,
  Sparkles,
  Star,
  Users,
  Briefcase,
  Clock,
  DollarSign,
  User,
  MessageSquareText,
  Send,
  Plus,
  X,
  Menu,
  Settings,
  Bell,
  Image,
  RefreshCcw, // Mantido para o ícone, mas a funcionalidade de reset será removida
  ChevronLeft,
  ChevronRight,
  MapPin,
  ClipboardCheck,
} from 'lucide-react';

// Dados fictícios iniciais - AGORA LIMPOS
const initialMockData = {
  // Lista de clientes
  clients: [
    { id: '1', name: 'Gabriela Silva', email: 'gabi@email.com' },
    { id: '2', name: 'Fernanda Costa', email: 'fe@email.com' },
    { id: '3', name: 'Clara Souza', email: 'clara@email.com' },
  ],
  specialists: [
    { id: 'thaynaferreira', name: 'Thayna Ferreira', bio: 'Especialista em unhas de gel e fibra de vidro.', rating: 4.8, services: ['Unhas em Gel', 'Alongamento', 'Manicure Básica'], avatar: 'https://placehold.co/100x100/5C6BC0/FFFFFF?text=TF', portfolio: { active: true, images: ['https://placehold.co/400x300/4B5563/FFFFFF?text=Foto+1', 'https://placehold.co/400x300/6B7280/FFFFFF?text=Foto+2', 'https://placehold.co/400x300/9CA3AF/FFFFFF?text=Foto+3'] } }
  ],
  // Agendamentos agora vazios para começar limpo
  appointments: [],
  // Mensagens agora vazias para começar limpo
  chatMessages: {},
  services: [
    { name: 'Manicure Básica', price: 30, duration: '45min' },
    { name: 'Unhas em Gel', price: 80, duration: '90min' },
    { name: 'Nail Art', price: 50, duration: '60min' },
    { name: 'Alongamento em Fibra', price: 120, duration: '120min' },
  ],
  // Notificações agora vazias para começar limpo
  notifications: [],
  schedule: {
    segunda: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    terca: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    quarta: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    quinta: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    sexta: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    sabado: { isWorking: false, startTime: '09:00', endTime: '13:00' },
    domingo: { isWorking: false, startTime: '', endTime: '' },
  }
};

// Componente para um Modal de Mensagem customizado
const MessageModal = ({ show, title, message, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <h4 className="text-xl font-bold mb-2 text-gray-800">{title}</h4>
        <p className="text-gray-600 mb-6">{message}</p>
        <button onClick={onClose} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
          OK
        </button>
      </div>
    </div>
  );
};

// Componente para a tela de Login
const LoginScreen = ({ onLogin, clients, onRegister, showModal }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' ou 'register'

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState(''); // Apenas para simulação

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Simulação de login de especialista
    if (loginId === 'thaynaferreira' && password === '241120') {
      onLogin('specialist', 'thaynaferreira');
      return;
    }
    
    // Simulação de login de cliente
    const client = clients.find(c => c.email === loginId);
    if (client) {
      // Em uma aplicação real, a senha seria verificada aqui
      onLogin('customer', client.id);
      return;
    }
    
    setError('ID ou senha incorretos.');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!registerName || !registerEmail) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (clients.find(c => c.email === registerEmail)) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    onRegister(registerName, registerEmail);
    setMode('login');
    setLoginId(registerEmail);
    showModal('Cadastro Concluído', `O cadastro de ${registerName} foi realizado com sucesso. Use seu e-mail para fazer login.`);
  };

  const renderForm = () => {
    if (mode === 'login') {
      return (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="E-mail do Cliente ou ID da Especialista"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 duration-200"
          >
            Entrar
          </button>
        </form>
      );
    } else { // mode === 'register'
      return (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu Nome Completo"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Seu E-mail"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Crie uma Senha"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 duration-200"
          >
            Cadastrar
          </button>
        </form>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center transform transition-all hover:scale-105 duration-300">
        <div className="flex items-center justify-center text-4xl mb-4 text-purple-600">
          <Sparkles size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{mode === 'login' ? 'Login' : 'Criar Conta'}</h1>
        <p className="text-gray-500 mb-8">{mode === 'login' ? 'Acesse seu painel.' : 'Junte-se a nós para agendar seus serviços de manicure.'}</p>

        {renderForm()}
        
        <div className="my-6 border-b border-gray-200 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400">ou</span>
        </div>

        {mode === 'login' ? (
          <button
            onClick={() => setMode('register')}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 duration-200"
          >
            Ainda não tenho cadastro
          </button>
        ) : (
          <button
            onClick={() => setMode('login')}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 duration-200"
          >
            Já tenho cadastro
          </button>
        )}
      </div>
    </div>
  );
};

// Componente para a tela de configurações da especialista
const SpecialistSettings = ({ services, setServices, portfolio, setPortfolio, schedule, setSchedule }) => {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });
  const [newImage, setNewImage] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.name && newService.price && newService.duration) {
      setServices([...services, { ...newService, price: parseFloat(newService.price) }]);
      setNewService({ name: '', price: '', duration: '' });
      setShowServiceForm(false);
    }
  };
  
  const handleAddImage = () => {
    if (newImage.trim()) {
      setPortfolio({ ...portfolio, images: [...portfolio.images, newImage] });
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    setPortfolio({ ...portfolio, images: portfolio.images.filter((_, i) => i !== index) });
  };

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prevSchedule => {
      const updatedSchedule = { ...prevSchedule };
      updatedSchedule[day] = { ...updatedSchedule[day], [field]: value };
      return updatedSchedule;
    });
  };

  return (
    <div className="space-y-6">
      {/* Cartões de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Users size={24} className="text-indigo-500" />
          </div>
          <div>
            <p className="text-gray-500">Clientes Atendidos</p>
            <p className="text-2xl font-bold text-gray-800">125</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <DollarSign size={24} className="text-purple-500" />
          </div>
          <div>
            <p className="text-gray-500">Ganhos do Mês</p>
            <p className="text-2xl font-bold text-gray-800">R$ 2.450,00</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
          <div className="bg-pink-100 p-3 rounded-full">
            <CalendarDays size={24} className="text-pink-500" />
          </div>
          <div>
            <p className="text-gray-500">Próximos Agendamentos</p>
            <p className="text-2xl font-bold text-gray-800">0</p> {/* Atualizado para 0 */}
          </div>
        </div>
      </div>
      
      {/* Meus Serviços */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <Gem size={20} />
            <span>Meus Serviços</span>
          </h3>
          <button
            onClick={() => setShowServiceForm(!showServiceForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-green-600 transition-colors flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>{showServiceForm ? 'Cancelar' : 'Adicionar Serviço'}</span>
          </button>
        </div>
        {/* Formulário para adicionar novo serviço */}
        {showServiceForm && (
          <form onSubmit={handleAddService} className="bg-gray-50 p-4 rounded-xl mb-4 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nome do Serviço"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="number"
                placeholder="Preço (R$)"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Duração (ex: 60min)"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
            type="submit"
            className="bg-purple-500 text-white w-full p-2 rounded-xl font-semibold shadow-md hover:bg-purple-600 transition-colors"
          >
              Salvar Serviço
            </button>
          </form>
        )}

        {/* Lista de serviços existentes */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{service.name}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                  <span className="flex items-center"><Clock size={14} className="mr-1" />{service.duration}</span>
                  <span className="flex items-center"><DollarSign size={14} className="mr-1" />R$ {service.price.toFixed(2)}</span>
                </div>
              </div>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors">
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Configuração de Horário de Trabalho */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center space-x-2">
          <Clock size={20} />
          <span>Horário de Trabalho</span>
        </h3>
        <div className="space-y-4">
          {Object.keys(schedule).map(day => (
            <div key={day} className="flex items-center space-x-4">
              <label className="flex-1 capitalize text-gray-800 font-semibold">{day}</label>
              <input
                type="checkbox"
                checked={schedule[day].isWorking}
                onChange={(e) => handleScheduleChange(day, 'isWorking', e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
              {schedule[day].isWorking && (
                <>
                  <input
                    type="time"
                    value={schedule[day].startTime}
                    onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span>até</span>
                  <input
                    type="time"
                    value={schedule[day].endTime}
                    onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Configuração de Portfólio */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <Image size={20} />
            <span>Portfólio</span>
          </h3>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm font-semibold text-gray-600">Portfólio Ativo</span>
            <input
              type="checkbox"
              checked={portfolio.active}
              onChange={(e) => setPortfolio({ ...portfolio, active: e.target.checked })}
              className="form-switch h-6 w-11 bg-gray-300 rounded-full appearance-none transition duration-200 ease-in-out checked:bg-purple-600"
            />
          </label>
        </div>
        {portfolio.active && (
          <div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Link da imagem"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddImage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolio.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`Portfólio ${index + 1}`} className="w-full h-auto rounded-xl object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente do Painel da Especialista
const SpecialistPanel = ({ onLogout, specialistId, appointments, setAppointments, chatMessages, setChatMessages, services, setServices, notifications, setNotifications, schedule, setSchedule, portfolio, setPortfolio, unreadMessagesCount, unreadNotificationsCount, onMarkChatAsRead, showModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('agenda');
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [showSuggestTimeModal, setShowSuggestTimeModal] = useState(false);
  const [appointmentToSuggest, setAppointmentToSuggest] = useState(null);
  const [suggestedDate, setSuggestedDate] = useState('');
  const [suggestedTime, setSuggestedTime] = useState('');

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const message = {
        id: (chatMessages[activeChat.id] ? chatMessages[activeChat.id].length : 0) + 1,
        sender: 'specialist',
        text: newMessage,
      };
      
      const newChatMessages = {
        ...chatMessages,
        [activeChat.id]: [...(chatMessages[activeChat.id] || []), message],
      };
      setChatMessages(newChatMessages);
      
      setAppointments(prevApps => prevApps.map(app =>
        app.id === activeChat.id ? { ...app, unreadMessagesClient: app.unreadMessagesClient + 1 } : app
      ));

      // Adiciona uma notificação para a cliente sobre a nova mensagem
      const appointment = appointments.find(app => app.id === activeChat.id);
      if (appointment) {
        setNotifications(prevNotifications => [...prevNotifications, {
          id: prevNotifications.length + 1,
          type: 'nova_mensagem',
          clientId: appointment.clientId,
          text: `Você tem uma nova mensagem de ${appointment.specialistName}.`,
          read: false,
        }]);
      }
      
      setNewMessage('');
    }
  };

  const handleUpdateAppointmentStatus = (id, newStatus, newTime = null, newDate = null) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus, date: newDate || app.date, time: newTime || app.time, unreadMessagesSpecialist: 0, unreadMessagesClient: 1 } : app
    ));

    const appointment = appointments.find(app => app.id === id);
    if (!appointment) return;

    let notificationText;
    let notificationType;
    let notificationClientId = appointment.clientId;

    switch (newStatus) {
      case 'accepted':
        notificationText = `Seu agendamento com ${appointment.specialistName} para ${appointment.date} às ${appointment.time} foi aceito!`;
        notificationType = 'agendamento_aceito';
        break;
      case 'declined':
        notificationText = `Seu agendamento com ${appointment.specialistName} para ${appointment.date} às ${appointment.time} foi recusado.`;
        notificationType = 'agendamento_recusado';
        break;
      case 'suggested':
        notificationText = `A especialista ${appointment.specialistName} sugeriu um novo horário: ${newDate} às ${newTime}.`;
        notificationType = 'sugestao';
        break;
      case 'cancelled':
        notificationText = `Seu agendamento com ${appointment.specialistName} para ${appointment.date} às ${appointment.time} foi cancelado pela profissional.`;
        notificationType = 'agendamento_cancelado';
        break;
      default:
        return;
    }
    
    setNotifications(prevNotifications => [...prevNotifications, {
      id: prevNotifications.length + 1,
      type: notificationType,
      clientId: notificationClientId,
      text: notificationText,
      read: false,
    }]);
    
    showModal("Status Atualizado", `O agendamento com ${appointment.clientName} foi ${newStatus === 'accepted' ? 'aceito' : newStatus === 'declined' ? 'recusado' : newStatus === 'suggested' ? 'foi enviada uma sugestão' : 'cancelado'}.`);
  };
  
  const handleSuggestSubmit = () => {
    if (appointmentToSuggest && suggestedDate && suggestedTime) {
      handleUpdateAppointmentStatus(appointmentToSuggest.id, 'suggested', suggestedTime, suggestedDate);
      setShowSuggestTimeModal(false);
      setAppointmentToSuggest(null);
      setSuggestedDate('');
      setSuggestedTime('');
    }
  };
  
  const handleCancelSubmit = () => {
    if (appointmentToCancel) {
      handleUpdateAppointmentStatus(appointmentToCancel.id, 'cancelled');
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };
  
  const handleOpenChat = (appointment) => {
    setActiveChat(appointment);
    onMarkChatAsRead(appointment.id, 'specialist');
  };
  
  const renderContent = () => {
    const pendingAppointments = appointments.filter(app => app.specialistId === specialistId && app.status === 'pending');
    const acceptedAppointments = appointments.filter(app => app.specialistId === specialistId && app.status === 'accepted');

    switch (currentView) {
      case 'agenda':
        return (
          <>
            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center space-x-2">
              <CalendarDays size={20} />
              <span>Pedidos de Agendamento</span>
            </h3>

            {/* Seção de Pedidos Pendentes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <h4 className="text-lg font-bold text-indigo-600 mb-4">Pedidos Pendentes ({pendingAppointments.length})</h4>
              <div className="space-y-4">
                {pendingAppointments.length > 0 ? (
                  pendingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{appointment.service}</p>
                        {/* Quebra de linha para telas menores */}
                        <p className="text-sm text-gray-500 sm:whitespace-nowrap">
                          Cliente: {appointment.clientName}
                          <br className="sm:hidden" />
                          em {appointment.date} às {appointment.time}
                        </p>
                        {/* A nova alteração permite que o endereço quebre a linha em telas menores */}
                        <div className="text-sm text-gray-500 flex items-center mt-1 flex-wrap">
                          <MapPin size={14} className="mr-1 flex-shrink-0" />
                          <span className="break-all">{appointment.address}</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-purple-600 hover:underline"
                          >
                            <MapPin size={16} />
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                        <button onClick={() => handleUpdateAppointmentStatus(appointment.id, 'accepted')} className="bg-green-500 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                          Aceitar
                        </button>
                        <button onClick={() => handleUpdateAppointmentStatus(appointment.id, 'declined')} className="bg-red-500 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                          Recusar
                        </button>
                        <button onClick={() => { setAppointmentToSuggest(appointment); setShowSuggestTimeModal(true); }} className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition-colors">
                          Sugerir Horário
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Nenhum pedido pendente.</p>
                )}
              </div>
            </div>

            {/* Seção de Agendamentos Confirmados */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-lg font-bold text-green-600 mb-4">Agendamentos Confirmados ({acceptedAppointments.length})</h4>
              <div className="space-y-4">
                {acceptedAppointments.length > 0 ? (
                  acceptedAppointments.map(appointment => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{appointment.service}</p>
                        <p className="text-sm text-gray-500 sm:whitespace-nowrap">
                          Cliente: {appointment.clientName}
                          <br className="sm:hidden" />
                          em {appointment.date} às {appointment.time}
                        </p>
                        {/* A nova alteração permite que o endereço quebre a linha em telas menores */}
                        <div className="text-sm text-gray-500 flex items-center mt-1 flex-wrap">
                          <MapPin size={14} className="mr-1 flex-shrink-0" />
                          <span className="break-all">{appointment.address}</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-purple-600 hover:underline"
                          >
                            <MapPin size={16} />
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                        <button
                          onClick={() => handleOpenChat(appointment)}
                          className="bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                          title="Conversar com a cliente"
                        >
                          <MessageSquareText size={20} />
                          {appointment.unreadMessagesSpecialist > 0 && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                          )}
                        </button>
                        <button onClick={() => { setAppointmentToCancel(appointment); setShowCancelModal(true); }} className="bg-red-500 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Nenhum agendamento confirmado.</p>
                )}
              </div>
            </div>
          </>
        );
      case 'configuracoes':
        return <SpecialistSettings
          services={services}
          setServices={setServices}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          schedule={schedule}
          setSchedule={setSchedule}
        />;
      case 'messages':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Minhas Mensagens</h4>
            <div className="space-y-4">
              {appointments.filter(app => app.specialistId === specialistId).length > 0 ? (
                appointments.filter(app => app.specialistId === specialistId).map(app => (
                  <button
                    key={app.id}
                    onClick={() => handleOpenChat(app)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors relative"
                  >
                    <div className="flex items-center space-x-3">
                      <img src="https://placehold.co/40x40/E5E7EB/4B5563?text=CS" alt={app.clientName} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <p className={`font-semibold ${app.unreadMessagesSpecialist > 0 ? 'text-indigo-600' : 'text-gray-800'}`}>
                          Conversa com {app.clientName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {chatMessages[app.id] && chatMessages[app.id].length > 0 ? chatMessages[app.id][chatMessages[app.id].length - 1].text : 'Nenhuma mensagem'}
                        </p>
                      </div>
                      {app.unreadMessagesSpecialist > 0 && (
                        <span className="ml-auto flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500 text-white text-xs">
                          {app.unreadMessagesSpecialist}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma conversa encontrada.</p>
              )}
            </div>
          </div>
        );
      case 'notifications':
        const specialistNotifications = notifications.filter(notif => !notif.clientId);
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Minhas Notificações</h4>
            <div className="space-y-4">
              {specialistNotifications.length > 0 ? (
                specialistNotifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-xl border border-gray-200 ${!notif.read ? 'bg-indigo-50' : 'bg-white'}`}>
                    <p className={`text-sm ${!notif.read ? 'font-semibold text-indigo-700' : 'text-gray-600'}`}>
                      {notif.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma notificação nova.</p>
                )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Menu Hambúrguer e Cabeçalho */}
      <div className="bg-white p-4 sm:p-6 shadow-md sticky top-0 z-40 flex items-center justify-between">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Painel da Especialista</h1>
        <div className="flex items-center space-x-2">
          {/* Botão de Notificações, sempre visível */}
          <div className="relative">
            <button onClick={() => { setCurrentView('notifications'); }} className="relative p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
              <Bell size={24} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
          </div>

          {/* Botão de Mensagens, sempre visível */}
          <div className="relative">
            <button onClick={() => { setCurrentView('messages'); }} className="relative p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
              <MessageSquareText size={24} />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      {/* Overlay do Menu Lateral */}
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-64 h-full p-6 shadow-xl flex flex-col transition-transform duration-300 transform -translate-x-full" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-purple-600">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4 flex-grow">
              <button
                onClick={() => { setCurrentView('agenda'); setIsMenuOpen(false); }}
                className={`w-full text-left p-3 rounded-xl font-semibold transition-colors flex items-center space-x-3 ${currentView === 'agenda' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <CalendarDays size={20} />
                <span>Agendamentos</span>
              </button>
              <button
                onClick={() => { setCurrentView('configuracoes'); setIsMenuOpen(false); }}
                className={`w-full text-left p-3 rounded-xl font-semibold transition-colors flex items-center space-x-3 ${currentView === 'configuracoes' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Settings size={20} />
                <span>Configurações do App</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {renderContent()}
      </div>

      {/* Modal de Chat */}
      {activeChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col h-[80vh] md:h-[600px]">
            {/* Cabeçalho do Chat */}
            <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <h4 className="text-lg font-bold">Conversa com {activeChat.clientName}</h4>
              <button onClick={() => setActiveChat(null)} className="p-1 rounded-full hover:bg-indigo-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            {/* Corpo do Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages[activeChat.id] && chatMessages[activeChat.id].map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'specialist' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'specialist' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-gray-300 text-gray-800 rounded-bl-none'}`}>
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Rodapé do Chat (Input) */}
            <div className="p-4 bg-white rounded-b-2xl border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para Sugerir Horário */}
      {showSuggestTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Sugerir Novo Horário</h4>
              <button onClick={() => setShowSuggestTimeModal(false)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-500 mb-4">Selecione uma nova data e horário para a cliente.</p>
            <div className="space-y-4">
              <input
                type="date"
                value={suggestedDate}
                onChange={(e) => setSuggestedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
              <input
                type="time"
                value={suggestedTime}
                onChange={(e) => setSuggestedTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
              <button onClick={handleSuggestSubmit} className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600">
                Enviar Sugestão
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Confirmação de Cancelamento */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <h4 className="text-lg font-bold mb-2">Confirmar Cancelamento</h4>
            <p className="text-gray-500 mb-4">Tem certeza de que deseja cancelar este agendamento?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleCancelSubmit} className="bg-red-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-red-600">
                Sim, Cancelar
              </button>
              <button onClick={() => setShowCancelModal(false)} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-xl font-semibold hover:bg-gray-300">
                Não, Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de agendamento do cliente
const CustomerBooking = ({ specialist, specialistSchedule, services, onBookingSubmit, onBack, currentClient, showModal }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState(''); // Novo estado para o endereço
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getAvailableTimeSlots = (date) => {
    // Array com os nomes dos dias da semana em português
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    // Obtém o nome do dia da semana (0 para domingo, 1 para segunda, etc.)
    const dayOfWeek = date.getDay(); 
    const schedule = specialistSchedule[dayNames[dayOfWeek]];
    const slots = [];

    // Se a profissional não trabalha neste dia, não há slots
    if (!schedule || !schedule.isWorking) {
      return slots;
    }

    // Gera os slots de horário com base no início e fim do expediente
    let [startHour, startMinute] = schedule.startTime.split(':').map(Number);
    let [endHour, endMinute] = schedule.endTime.split(':').map(Number);
    
    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0, 0);
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    while (currentTime < endTime) {
      slots.push(currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      currentTime.setMinutes(currentTime.getMinutes() + 60); // Slots de 60 minutos
    }
    return slots;
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];
    for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };
  
  const getDayName = (date) => {
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    return dayNames[date.getDay()];
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime && address.trim()) {
      onBookingSubmit({
        specialistId: specialist.id,
        specialistName: specialist.name,
        clientId: currentClient.id,
        clientName: currentClient.name,
        service: selectedService.name,
        date: selectedDate.toLocaleDateString('pt-BR'),
        time: selectedTime,
        address: address, // Envia o novo campo de endereço
        unreadMessagesSpecialist: 1, // Notificação para a especialista
        unreadMessagesClient: 0,
        status: 'pending', // Novo status inicial
      });
      showModal('Pedido Enviado', 'Seu pedido de agendamento foi enviado com sucesso! Aguarde a confirmação da profissional.');
      onBack(); // Volta para a tela inicial do cliente
    } else {
      showModal('Erro', 'Por favor, selecione um serviço, data, horário e insira o endereço.');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Agendar Horário com {specialist.name}</h3>
        <button onClick={onBack} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Voltar
        </button>
      </div>

      {/* Passo 1: Escolher Serviço */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h4 className="text-xl font-bold text-gray-700 mb-4">1. Escolha o Serviço</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map(service => (
            <button
              key={service.name}
              onClick={() => setSelectedService(service)}
              className={`p-4 rounded-xl text-left border-2 transition-all ${selectedService?.name === service.name ? 'border-purple-600 bg-purple-50 shadow-md scale-105' : 'border-gray-200 hover:border-purple-400 hover:shadow-sm'}`}
            >
              <p className="font-semibold text-gray-800">{service.name}</p>
              <p className="text-sm text-gray-500">R$ {service.price.toFixed(2)} • {service.duration}</p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Passo 2: Escolher Data */}
      {selectedService && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-xl font-bold text-gray-700 mb-4">2. Escolha a Data</h4>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-purple-600"><ChevronLeft size={24} /></button>
            <span className="font-semibold text-lg text-gray-800">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNextMonth} className="text-gray-600 hover:text-purple-600"><ChevronRight size={24} /></button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <span key={day} className="text-sm font-bold text-gray-500">{day}</span>
            ))}
            {Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()).fill(null).map((_, i) => (
              <span key={`empty-${i}`}></span>
            ))}
            {daysInMonth.map(date => {
              const dayName = getDayName(date);
              const isWorking = specialistSchedule[dayName].isWorking;
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => isWorking && setSelectedDate(date)}
                  disabled={!isWorking}
                  className={`p-2 rounded-xl transition-all ${!isWorking ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : selectedDate?.toDateString() === date.toDateString() ? 'bg-purple-600 text-white font-bold' : 'text-gray-800 hover:bg-gray-200'}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Passo 3: Escolher Horário */}
      {selectedService && selectedDate && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-xl font-bold text-gray-700 mb-4">3. Escolha o Horário</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {getAvailableTimeSlots(selectedDate).map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-xl border-2 transition-all text-sm font-semibold ${selectedTime === time ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Passo 4: Endereço */}
      {selectedService && selectedDate && selectedTime && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-xl font-bold text-gray-700 mb-4">4. Digite seu Endereço</h4>
          <input
            type="text"
            placeholder="Ex: Rua das Flores, 123, São Paulo - SP"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
      )}

      {/* Botão de Confirmação */}
      <button
        onClick={handleBooking}
        disabled={!selectedService || !selectedDate || !selectedTime || !address.trim()}
        className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Confirmar Agendamento
      </button>
    </div>
  );
};

// Componente do Painel do Cliente
const CustomerPanel = ({ onLoginAsSpecialist, specialist, clients, currentClientId, services, specialistSchedule, appointments, notifications, onBookingSubmit, chatMessages, setChatMessages, onMarkChatAsRead, onMarkAllNotificationsAsRead, showModal }) => {
  const [customerView, setCustomerView] = useState('info'); // 'info', 'agenda', 'messages', 'notifications', 'booking'
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Encontra o cliente atual pelo ID
  const currentClient = clients.find(c => c.id === currentClientId);
  const clientAppointments = appointments.filter(app => app.clientId === currentClientId);
  const clientNotifications = notifications.filter(notif => notif.clientId === currentClientId);
  
  // Contagens de mensagens e notificações não lidas
  const unreadMessagesCount = clientAppointments.reduce((acc, curr) => acc + curr.unreadMessagesClient, 0);
  const unreadNotificationsCount = clientNotifications.filter(n => !n.read).length;

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const message = {
        id: (chatMessages[activeChat.id] ? chatMessages[activeChat.id].length : 0) + 1,
        sender: 'client',
        text: newMessage,
      };
      
      const newChatMessages = {
        ...chatMessages,
        [activeChat.id]: [...(chatMessages[activeChat.id] || []), message]
      };
      setChatMessages(newChatMessages);
      
      setAppointments(prevApps => prevApps.map(app =>
        app.id === activeChat.id ? { ...app, unreadMessagesSpecialist: app.unreadMessagesSpecialist + 1 } : app
      ));

      // Adiciona uma notificação para a especialista sobre a nova mensagem
      const appointment = appointments.find(app => app.id === activeChat.id);
      if (appointment) {
        setNotifications(prevNotifications => [...prevNotifications, {
          id: prevNotifications.length + 1,
          type: 'nova_mensagem',
          text: `Você tem uma nova mensagem de ${appointment.clientName}.`,
          read: false,
        }]);
      }
      
      setNewMessage('');
    }
  };
  
  const handleOpenChat = (appointment) => {
    setActiveChat(appointment);
    onMarkChatAsRead(appointment.id, 'client');
  };

  const renderContent = () => {
    switch (customerView) {
      case 'info':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-700">Nossa Especialista</h3>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 transform transition-all hover:scale-[1.01] duration-200">
              <div className="flex-shrink-0">
                <img src={specialist.avatar} alt={specialist.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-indigo-200" />
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-800">{specialist.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{specialist.bio}</p>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" className="mr-1" />
                  <span className="text-gray-600 font-semibold">{specialist.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">(123 avaliações)</span>
                </div>
                {specialist.portfolio.active && (
                  <button
                    onClick={() => setShowPortfolio(true)}
                    className="mt-2 text-indigo-600 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <Image size={16} />
                    <span>Ver Portfólio</span>
                  </button>
                )}
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {services.map(service => (
                  <span key={service.name} className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                    {service.name}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setCustomerView('booking')}
                className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors"
              >
                Agendar
              </button>
            </div>
          </div>
        );
      case 'agenda':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Meus Agendamentos</h4>
            <div className="space-y-4">
              {clientAppointments.length > 0 ? (
                clientAppointments.map(app => (
                  <div key={app.id} className="p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{app.service}</p>
                      <p className="text-sm text-gray-500">Com: {app.specialistName}</p>
                      <p className="text-sm text-gray-500">{app.date} às {app.time}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{app.address}</span>
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : app.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {app.status === 'pending' ? 'Pendente' : app.status === 'accepted' ? 'Confirmado' : app.status === 'declined' ? 'Recusado' : app.status === 'suggested' ? 'Novo Horário Sugerido' : 'Cancelado'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Você ainda não tem agendamentos.</p>
              )}
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Minhas Mensagens</h4>
            <div className="space-y-4">
              {clientAppointments.length > 0 ? (
                clientAppointments.map(app => (
                  <button
                    key={app.id}
                    onClick={() => handleOpenChat(app)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={specialist.avatar} alt={specialist.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className={`font-semibold ${app.unreadMessagesClient > 0 ? 'text-indigo-600' : 'text-gray-800'}`}>
                          Conversa com {app.specialistName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {chatMessages[app.id] && chatMessages[app.id].length > 0 ? chatMessages[app.id][chatMessages[app.id].length - 1].text : 'Nenhuma mensagem'}
                        </p>
                      </div>
                      {app.unreadMessagesClient > 0 && (
                        <span className="ml-auto flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500 text-white text-xs">
                          {app.unreadMessagesClient}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma conversa encontrada.</p>
              )}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Minhas Notificações</h4>
            <div className="space-y-4">
              {clientNotifications.length > 0 ? (
                clientNotifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-xl border border-gray-200 ${!notif.read ? 'bg-indigo-50' : 'bg-white'}`}>
                    <p className={`text-sm ${!notif.read ? 'font-semibold text-indigo-700' : 'text-gray-600'}`}>
                      {notif.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Nenhuma notificação nova.</p>
              )}
            </div>
          </div>
        );
      case 'booking':
        return (
          <CustomerBooking
            specialist={specialist}
            specialistSchedule={specialistSchedule}
            services={services}
            onBookingSubmit={onBookingSubmit}
            onBack={() => setCustomerView('info')}
            currentClient={currentClient}
            showModal={showModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do Cliente com Navegação */}
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <User size={48} className="text-indigo-500" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Olá, {currentClient ? currentClient.name.split(' ')[0] : 'Cliente'}!</h2>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Botão Reset removido */}
              <button
                onClick={onLoginAsSpecialist}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 transition-colors"
              >
                <Briefcase size={20} />
                <span className="hidden sm:inline">Sou Especialista</span>
              </button>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-between items-center bg-gray-100 p-2 rounded-xl gap-2">
            <button
              onClick={() => { setCustomerView('info'); }}
              className={`flex-1 text-center py-2 px-1 text-sm sm:text-base rounded-lg font-semibold transition-colors ${customerView === 'info' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Informações
            </button>
            <button
              onClick={() => setCustomerView('agenda')}
              className={`flex-1 text-center py-2 px-1 text-sm sm:text-base rounded-lg font-semibold transition-colors ${customerView === 'agenda' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Agenda
            </button>
            <button
              onClick={() => setCustomerView('messages')}
              className={`relative flex-1 text-center py-2 px-1 text-sm sm:text-base rounded-lg font-semibold transition-colors ${customerView === 'messages' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Mensagens
              {unreadMessagesCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
            </button>
            <button
              onClick={() => { setCustomerView('notifications'); onMarkAllNotificationsAsRead(); }}
              className={`relative flex-1 text-center py-2 px-1 text-sm sm:text-base rounded-lg font-semibold transition-colors ${customerView === 'notifications' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Notificações
              {unreadNotificationsCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
            </button>
          </nav>
        </div>

        {renderContent()}
      </div>

      {/* Modal de Portfólio */}
      {showPortfolio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h4 className="text-lg font-bold text-gray-800">Portfólio de {specialist.name}</h4>
              <button onClick={() => setShowPortfolio(false)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {specialist.portfolio.images.map((image, index) => (
                <img key={index} src={image} alt={`Portfólio ${index + 1}`} className="rounded-xl object-cover w-full h-auto shadow-md" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Chat da Cliente */}
      {activeChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col h-[80vh] md:h-[600px]">
            {/* Cabeçalho do Chat */}
            <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <h4 className="text-lg font-bold">Conversa com {activeChat.specialistName}</h4>
              <button onClick={() => setActiveChat(null)} className="p-1 rounded-full hover:bg-indigo-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            {/* Corpo do Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages[activeChat.id] && chatMessages[activeChat.id].map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'client' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-gray-300 text-gray-800 rounded-bl-none'}`}>
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Rodapé do Chat (Input) */}
            <div className="p-4 bg-white rounded-b-2xl border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal do App
export default function App() {
  const [view, setView] = useState('login'); // Começa na tela de login
  const [userType, setUserType] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Estados globais
  const [clients, setClients] = useState(initialMockData.clients);
  const [specialists, setSpecialists] = useState(initialMockData.specialists);
  const [appointments, setAppointments] = useState(initialMockData.appointments);
  const [chatMessages, setChatMessages] = useState(initialMockData.chatMessages);
  const [services, setServices] = useState(initialMockData.services);
  const [notifications, setNotifications] = useState(initialMockData.notifications);
  
  // Modal State
  const [showModalState, setShowModalState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  
  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModalState(true);
  };
  
  const closeModal = () => {
    setShowModalState(false);
    setModalTitle('');
    setModalMessage('');
  };
  
  // Encontra a especialista "Thayna Ferreira" e mantém seus dados em estado separado para fácil manipulação
  const [thaynaSpecialist, setThaynaSpecialist] = useState(initialMockData.specialists.find(s => s.id === 'thaynaferreira'));
  const [thaynaPortfolio, setThaynaPortfolio] = useState(thaynaSpecialist.portfolio);
  const [thaynaSchedule, setThaynaSchedule] = useState(initialMockData.schedule);

  // Efeito para sincronizar os dados da especialista com o estado geral 'specialists'
  useEffect(() => {
    setThaynaSpecialist(prev => ({ ...prev, portfolio: thaynaPortfolio }));
    setSpecialists(prevSpecs => prevSpecs.map(spec =>
      spec.id === 'thaynaferreira' ? { ...spec, portfolio: thaynaPortfolio } : spec
    ));
  }, [thaynaPortfolio]);
  
  // Sincroniza os serviços da especialista
  useEffect(() => {
    setThaynaSpecialist(prev => ({ ...prev, services: services.map(s => s.name) }));
    setSpecialists(prevSpecs => prevSpecs.map(spec =>
      spec.id === 'thaynaferreira' ? { ...spec, services: services.map(s => s.name) } : spec
    ));
  }, [services]);

  // Sincroniza os horários da especialista
  useEffect(() => {
    setThaynaSpecialist(prev => ({ ...prev, schedule: thaynaSchedule }));
    setSpecialists(prevSpecs => prevSpecs.map(spec =>
      spec.id === 'thaynaferreira' ? { ...spec, schedule: thaynaSchedule } : spec
    ));
  }, [thaynaSchedule]);

  // Efeito para logar automaticamente como especialista na primeira renderização
  useEffect(() => {
    handleLogin('specialist', 'thaynaferreira');
  }, []);

  const handleRegisterClient = (name, email) => {
    const newClient = {
      id: (clients.length + 1).toString(),
      name,
      email,
    };
    setClients(prevClients => [...prevClients, newClient]);
  };
  
  // A função handleResetData foi removida, pois o botão de reset foi retirado.

  const handleLogin = (type, id) => {
    setUserType(type);
    setCurrentUserId(id);
    setView(type === 'customer' ? 'customer' : 'specialist');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentUserId(null);
    setView('login');
  };
  
  const handleBookingSubmit = (newAppointment) => {
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    const appointmentWithId = { ...newAppointment, id: newId };
    setAppointments(prevAppointments => [...prevAppointments, appointmentWithId]);
    // Adiciona uma notificação para a especialista
    setNotifications(prevNotifications => [...prevNotifications, {
      id: prevNotifications.length + 1,
      type: 'agendamento_pendente',
      clientId: null,
      text: `Novo agendamento de ${newAppointment.clientName} para ${newAppointment.date} às ${newAppointment.time}.`,
      read: false,
    }]);
  };

  const handleMarkChatAsRead = (appointmentId, readerType) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(app => {
        if (app.id === appointmentId) {
          if (readerType === 'specialist') {
            return { ...app, unreadMessagesSpecialist: 0 };
          } else if (readerType === 'client') {
            return { ...app, unreadMessagesClient: 0 };
          }
        }
        return app;
      })
    );
  };
  
  const handleMarkAllNotificationsAsRead = () => {
    if (userType === 'customer') {
      setNotifications(prevNotifications =>
        prevNotifications.map(notif => (notif.clientId === currentUserId ? { ...notif, read: true } : notif))
      );
    } else if (userType === 'specialist') {
      setNotifications(prevNotifications =>
        prevNotifications.map(notif => (!notif.clientId ? { ...notif, read: true } : notif))
      );
    }
  };

  // Recalcular as contagens de mensagens e notificações não lidas
  const unreadMessagesCountSpecialist = appointments.reduce((acc, app) => acc + app.unreadMessagesSpecialist, 0);
  const unreadNotificationsCountSpecialist = notifications.filter(n => !n.clientId && !n.read).length;
  
  const clientAppointments = currentUserId ? appointments.filter(app => app.clientId === currentUserId) : [];
  const unreadMessagesCountClient = clientAppointments.reduce((acc, app) => acc + app.unreadMessagesClient, 0);
  const clientNotifications = currentUserId ? notifications.filter(notif => notif.clientId === currentUserId) : [];
  const unreadNotificationsCountClient = clientNotifications.filter(n => !n.read).length;

  const renderView = () => {
    switch (view) {
      case 'customer':
        return <CustomerPanel
          onLoginAsSpecialist={() => handleLogin('specialist', 'thaynaferreira')}
          // onResetData removido
          specialist={thaynaSpecialist}
          clients={clients}
          currentClientId={currentUserId}
          services={services}
          specialistSchedule={thaynaSchedule}
          appointments={appointments}
          notifications={notifications}
          onBookingSubmit={handleBookingSubmit}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          onMarkChatAsRead={handleMarkChatAsRead}
          onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
          showModal={showModal}
        />;
      case 'specialist':
        return <SpecialistPanel 
          onLogout={handleLogout} 
          // onResetData removido
          specialistId={currentUserId}
          appointments={appointments}
          setAppointments={setAppointments}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          services={services}
          setServices={setServices}
          notifications={notifications}
          setNotifications={setNotifications}
          schedule={thaynaSchedule}
          setSchedule={setThaynaSchedule}
          portfolio={thaynaPortfolio}
          setPortfolio={setThaynaPortfolio}
          unreadMessagesCount={unreadMessagesCountSpecialist}
          unreadNotificationsCount={unreadNotificationsCountSpecialist}
          onMarkChatAsRead={handleMarkChatAsRead}
          showModal={showModal}
        />;
      case 'login':
      default:
        return <LoginScreen onLogin={handleLogin} clients={clients} onRegister={handleRegisterClient} showModal={showModal} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
      <MessageModal
        show={showModalState}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
}
