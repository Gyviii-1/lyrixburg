
    /* ==================== FIREBASE INIT ==================== */
    const firebaseConfig = {
      apiKey: "AIzaSyCwRA7EFCpcusdBajUnz0DMXfD9SMtwKUk",
      authDomain: "luriksburg-constitution.firebaseapp.com",
      projectId: "luriksburg-constitution",
      storageBucket: "luriksburg-constitution.firebasestorage.app",
      messagingSenderId: "553762266039",
      appId: "1:553762266039:web:0881ade562b9f1092b2632",
      measurementId: "G-GH938KC1YL"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Принудительно отключить persistence — убрать весь кэш
    // (именно он вызывал баги с "уже зарегистрирован")

    const ADMIN_NAMES = ['w00fla', 'Kustik589'];

    /* ==================== PAGE SWITCHING ==================== */
    var currentPage = 'laws';

    function switchPage(pageName, linkEl) {
      if (pageName === currentPage) return;

      var oldPage = document.getElementById('page-' + currentPage);
      var newPage = document.getElementById('page-' + pageName);
      var heroTitle = document.getElementById('heroMainTitle');

      var pageTitles = {
        laws: 'Устав и Свод Законов<br>города Луриксбург',
        economy: 'Экономика<br>города Луриксбург',
        community: 'Жители, Чёрный список и Оценки<br>города Луриксбург'
      };
      var browserTitles = {
        laws: 'Устав города Луриксбург',
        economy: 'Экономика города Луриксбург',
        community: 'Сообщество города Луриксбург'
      };

      // Update active link
      document.querySelectorAll('.nav-page-link').forEach(function(a) {
        a.classList.remove('active');
      });
      if (linkEl) linkEl.classList.add('active');

      // Animate hero title
      if (heroTitle) {
        heroTitle.classList.remove('title-swap');
        void heroTitle.offsetWidth;
        heroTitle.classList.add('title-swap');
        setTimeout(function() {
          heroTitle.innerHTML = pageTitles[pageName] || pageTitles.laws;
        }, 240);
      }

      // Browser title
      if (browserTitles[pageName]) document.title = browserTitles[pageName];

      // Animate old page out, then new page in
      if (oldPage) {
        oldPage.classList.remove('page-out');
        void oldPage.offsetWidth;
        oldPage.classList.add('page-out');
      }

      setTimeout(function() {
        // Hide all
        document.querySelectorAll('.page-section').forEach(function(p) {
          p.style.display = 'none';
          p.classList.remove('page-out');
        });
        // Show new
        if (newPage) {
          newPage.style.display = 'block';
          newPage.style.animation = 'none';
          void newPage.offsetWidth;
          newPage.style.animation = '';
        }
        currentPage = pageName;
      }, 250);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ==================== CHANGELOG ==================== */
    var SITE_CHANGELOG = [
      {
        version: 'v0.2.48',
        date: '10 авг. 2026',
        items: [
          'Навигация по вкладкам: Законы / Экономика / Сообщество',
          'Каждая вкладка показывает свой набор секций',
          'Favicon сайта — ⚖ на фиолетовом фоне'
        ]
      },
      {
        version: 'v0.2.46',
        date: '10 авг. 2026',
        items: [
          'История обновлений переведена на единый JS-список',
          'Кастомные декоративные теги для пользователей',
          'Смена роли по клику на бейдж в списке пользователей',
          'Роль «Зам» с правами Мэра'
        ]
      },
      {
        version: 'v0.2.45',
        date: '18 июня 2025',
        items: [
          'Добавлено логирование всех действий в Firestore (коллекция logs)',
          'Роль «Зам» получила все права Мэра (назначение ролей, блокировка, удаление)',
          'Сводка обновлений сайта с номером версии'
        ]
      },
      {
        version: 'v0.2.42',
        date: '18 июня 2025',
        items: [
          'Полный редизайн: фиолетовая/маджента тема под символику города',
          'Переключатель тем: фиолетовая ↔ золотая (сохраняется в localStorage)',
          'Все тексты обновлены: «Конституция» → «Устав города»',
          'Иконка герба заменена на ⚖'
        ]
      },
      {
        version: 'v0.2.38',
        date: '17 июня 2025',
        items: [
          'Мобильная версия: выдвижное боковое меню, адаптивные карточки',
          'Левая навигационная панель на десктопе (постоянная)',
          'Стрелка вниз ↓ в начале и стрелка вверх ↑ в конце страницы'
        ]
      },
      {
        version: 'v0.2.34',
        date: '17 июня 2025',
        items: [
          'Сортировка жителей: Мэр → Зам → Шериф → Судья → Житель, внутри по алфавиту',
          'Роли в реестре жителей: Мэр, Зам, Шериф, Судья',
          'Редактирование и удаление ответов администрации на отзывы',
          'Метка «(ред.)» при изменении оценки пользователем'
        ]
      },
      {
        version: 'v0.2.28',
        date: '16 июня 2025',
        items: [
          'Роль «Шериф» (синий бейдж, права админа)',
          'Админы, Мэр и Шериф могут отвечать на оценки',
          'Список зарегистрированных пользователей доступен админам (без назначения ролей)'
        ]
      },
      {
        version: 'v0.2.22',
        date: '16 июня 2025',
        items: [
          'Блокировка/разблокировка аккаунтов (Мэр)',
          'Кнопка полного удаления документа из Firestore',
          'Система голосования Reddit-стиль (▲ счёт ▼)',
          'Админы видят кто голосовал и могут удалять голоса'
        ]
      },
      {
        version: 'v0.2.16',
        date: '15 июня 2025',
        items: [
          'Меню «👑 Роли» — Мэр может назначать роли пользователям',
          'Список всех зарегистрированных пользователей',
          'Тег «👑 Мэр» для w00fla во всех отзывах',
          'Чёрный список: блокировка оценок + ссылка на Telegram'
        ]
      },
      {
        version: 'v0.2.10',
        date: '15 июня 2025',
        items: [
          'Реестр жителей Луриксбурга (Firestore коллекция citizens)',
          'Бейджи ролей в отзывах: Админ, Житель, Гость, Заблокирован',
          'Кнопка «Войти» в шапке → профиль с аватаром и сменой пароля'
        ]
      },
      {
        version: 'v0.2.1',
        date: '14 июня 2025',
        items: [
          'Интеграция Firebase: авторизация, Firestore база данных',
          'Система оценок и отзывов в реальном времени',
          'Скрытая почта login@luriksburg.local для регистрации',
          'Защита от мультиаккаунтов по IP',
          'Поиск по Уставу (Ctrl+K)',
          'Прогресс-бар чтения, анимация частиц, оглавление'
        ]
      }
    ];

    function renderChangelog() {
      var container = document.getElementById('changelogList');
      if (!container) return;
      container.innerHTML = SITE_CHANGELOG.map(function(entry) {
        return '<div class="changelog-entry">' +
          '<div class="changelog-ver">' +
            '<span class="changelog-tag">' + entry.version + '</span>' +
            '<span class="changelog-date">' + entry.date + '</span>' +
          '</div>' +
          '<ul class="changelog-list">' +
            entry.items.map(function(item) { return '<li>' + item + '</li>'; }).join('') +
          '</ul>' +
        '</div>';
      }).join('');

      var badge = document.getElementById('navVersionBadge');
      if (badge && SITE_CHANGELOG.length) badge.textContent = SITE_CHANGELOG[0].version;
    }

    function openChangelog() {
      document.getElementById('changelogModal').classList.add('open');
    }
    function closeChangelog() {
      document.getElementById('changelogModal').classList.remove('open');
    }
    document.getElementById('changelogModal').addEventListener('click', function(e) {
      if (e.target.id === 'changelogModal') closeChangelog();
    });
    renderChangelog();

    /* ==================== LOGGING ==================== */
    function writeLog(action, details) {
      try {
        db.collection('logs').add({
          action: action,
          details: details || '',
          user: (currentUser ? (getDisplayName ? getDisplayName() : currentUser.uid) : 'Гость'),
          uid: currentUser ? currentUser.uid : null,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch(e) { console.warn('[Log Error]', e); }
    }

    /* ==================== STATE ==================== */
    let currentUser = null;
    let currentUserData = null;
    let authMode = 'register';
    let pickedStars = 0;
    let ratingsData = [];
    let unsubscribeRatings = null;
    let fbConnected = false;
    let lastAuthAttempt = 0;
    let lastRatingSubmit = 0;

    /* ==================== AUTH STATE LISTENER ==================== */
    auth.onAuthStateChanged(function(user) {
      console.log('[Auth State]', user ? user.uid + ' / ' + user.displayName : 'signed out');
      currentUser = user;

      if (user) {
        // Загрузить профиль из Firestore
        db.collection('users').doc(user.uid).get()
          .then(function(doc) {
            if (doc.exists && doc.data().role === 'deleted') {
              // Аккаунт удалён мэром — выбросить
              console.warn('[Auth] Account deleted, signing out:', user.uid);
              auth.signOut();
              currentUser = null;
              currentUserData = null;
              showToast('🚫 Ваш аккаунт заблокирован администрацией', true);
              renderAuthBar();
              renderRateArea();
              renderReviews();
              hideLoading();
              return;
            }
            if (doc.exists) {
              currentUserData = doc.data();
            } else {
              // Профиля нет — создать базовый (всегда user, админ только через Мэра)
              var fallback = user.displayName || (user.email ? user.email.split('@')[0] : 'Гражданин');
              currentUserData = {
                displayName: fallback,
                role: 'user'
              };
              db.collection('users').doc(user.uid).set({
                username: fallback,
                role: 'user',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });
            }
            renderAuthBar();
            renderRateArea();
            renderReviews();
          })
          .catch(function(e) {
            console.error('[Firestore user load error]', e);
            var fallback = user.displayName || (user.email ? user.email.split('@')[0] : 'Гражданин');
            currentUserData = { displayName: fallback, role: 'user' };
            renderAuthBar();
            renderRateArea();
            renderReviews();
          });
      } else {
        currentUserData = null;
        renderAuthBar();
        renderRateArea();
        renderReviews();
      }

      hideLoading();
    });

    /* ==================== LOADING ==================== */
    function hideLoading() {
      var el = document.getElementById('loadingOverlay');
      if (el) el.classList.add('hidden');
    }

    /* ======================================================
       AUTH — НАПИСАНО С НУЛЯ, БЕЗ ЛОКАЛЬНЫХ ПРОВЕРОК
       Всё решает Firebase. Никаких массивов / кэша.
       ====================================================== */

    function openAuth(mode) {
      setAuthMode(mode || 'register');
      document.getElementById('authModal').classList.add('open');
      document.getElementById('authError').textContent = '';
      setTimeout(function() { document.getElementById('inpUser').focus(); }, 100);
    }

    function closeAuth() {
      document.getElementById('authModal').classList.remove('open');
      document.getElementById('authError').textContent = '';
      document.getElementById('inpUser').value = '';
      document.getElementById('inpPass').value = '';
    }

    function setAuthMode(mode) {
      authMode = mode;
      var isReg = (mode === 'register');
      document.getElementById('authTitle').textContent = isReg ? 'Регистрация' : 'Вход';
      document.getElementById('authSub').textContent = isReg
        ? 'Станьте гражданином, чтобы оценить город'
        : 'С возвращением, гражданин Луриксбурга';
      document.getElementById('authSubmit').textContent = isReg ? 'Зарегистрироваться' : 'Войти';
      document.getElementById('authSwitch').innerHTML = isReg
        ? 'Уже гражданин? <span onclick="setAuthMode(\'login\')">Войти</span>'
        : 'Нет аккаунта? <span onclick="setAuthMode(\'register\')">Зарегистрироваться</span>';
      document.getElementById('authError').textContent = '';
    }

    document.getElementById('authModal').addEventListener('click', function(e) {
      if (e.target.id === 'authModal') closeAuth();
    });

    document.getElementById('authSubmit').addEventListener('click', doAuth);
    document.getElementById('inpUser').addEventListener('keydown', function(e) { if (e.key === 'Enter') doAuth(); });
    document.getElementById('inpPass').addEventListener('keydown', function(e) { if (e.key === 'Enter') doAuth(); });

    // ===== РЕГИСТРАЦИЯ (ваш рабочий код, адаптирован под compat SDK) =====
    async function handleRegister(username, password) {
      var formalEmail = username.trim().toLowerCase() + "@luriksburg.local";
      try {
        // 1. Получить IP пользователя (рабочий JSON endpoint ipify)
        var ipResponse = await fetch('https://api64.ipify.org?format=json');
        var ipData = await ipResponse.json();
        var userIp = ipData.ip;

        // 2. Исключение для IP разработчика
        var myAdminIp = "178.141.22.229";
        if (userIp === myAdminIp) {
          console.log('Регистрация разрешена: это IP разработчика');
        } else {
          // Для всех остальных пользователей — обычная проверка по Firestore
          var ipSnapshot = await db.collection('users').where('ipAddress', '==', userIp).get();
          if (!ipSnapshot.empty) {
            throw new Error('С вашего IP-адреса уже зарегистрирован аккаунт! Создание мультиаккаунтов запрещено.');
          }
        }

        // 3. Создать пользователя и записать IP в Firestore
        var userCredential = await auth.createUserWithEmailAndPassword(formalEmail, password);
        await userCredential.user.updateProfile({ displayName: username.trim() });
        await db.collection('users').doc(userCredential.user.uid).set({
          username: username.trim(),
          role: "user",
          ipAddress: userIp
        });
        closeAuth();
        showToast('🎉 Успешная регистрация, ' + username.trim() + '!');
        writeLog('register', 'Новый аккаунт: ' + username.trim() + ' | IP: ' + userIp);
      } catch (error) {
        console.error('[Register FAIL]', error.code, error.message);
        document.getElementById('authError').textContent = error.message ? error.message : ('Ошибка регистрации: [' + error.code + ']');
        writeLog('register_fail', 'Ник: ' + username.trim() + ' | Ошибка: ' + (error.code || error.message));
      }
    }

    // ===== ВХОД (ваш рабочий код, адаптирован под compat SDK) =====
    async function handleLogin(username, password) {
      var formalEmail = username.trim().toLowerCase() + "@luriksburg.local";
      try {
        await auth.signInWithEmailAndPassword(formalEmail, password);
        closeAuth();
        showToast('👋 Успешный вход!');
        writeLog('login', 'Вход: ' + username.trim());
      } catch (error) {
        console.error('[Login FAIL]', error.code, error.message);
        document.getElementById('authError').textContent = 'Неверный ник или пароль [' + error.code + ']';
        writeLog('login_fail', 'Ник: ' + username.trim() + ' | Ошибка: ' + (error.code || error.message));
      }
    }

    // ===== ОБЁРТКА: вызывается по нажатию кнопки =====
    async function doAuth() {
      var login = document.getElementById('inpUser').value.trim();
      var password = document.getElementById('inpPass').value;
      var errEl = document.getElementById('authError');
      var btn = document.getElementById('authSubmit');

      errEl.textContent = '';

      // Honeypot-ловушка: боты заполняют скрытое поле — молча отбрасываем
      var hp = document.getElementById('hpField');
      if (hp && hp.value.trim() !== '') {
        writeLog('bot_blocked', 'Honeypot: ' + hp.value.trim().substring(0, 100));
        closeAuth();
        showToast('🎉 Готово!');
        return;
      }

      // Защита от частых попыток (брутфорс/спам)
      var now = Date.now();
      if (now - lastAuthAttempt < 4000) {
        errEl.textContent = '⏳ Слишком часто — подождите пару секунд';
        return;
      }
      lastAuthAttempt = now;

      if (login.length < 3) { errEl.textContent = 'Ник должен быть не короче 3 символов'; return; }
      if (!/^[A-Za-z0-9_]+$/.test(login)) { errEl.textContent = 'Ник: только латиница, цифры и _'; return; }
      if (password.length < 6) { errEl.textContent = 'Пароль — минимум 6 символов'; return; }

      btn.disabled = true;
      btn.innerHTML = '<span class="loading-spinner"></span> Подождите...';

      if (authMode === 'register') {
        await handleRegister(login, password);
      } else {
        await handleLogin(login, password);
      }

      btn.disabled = false;
      btn.textContent = authMode === 'register' ? 'Зарегистрироваться' : 'Войти';
    }

    function logout() {
      auth.signOut().then(function() {
        currentUser = null;
        currentUserData = null;
        pickedStars = 0;
        renderAuthBar();
        renderRateArea();
        renderReviews();
        writeLog('logout', 'Выход из аккаунта');
        showToast('Вы вышли из аккаунта');
      });
    }

    function isAdmin() {
      return currentUserData && (currentUserData.role === 'admin' || currentUserData.role === 'sheriff');
    }

    function isSheriff() {
      return currentUserData && currentUserData.role === 'sheriff';
    }

    function isDeputy() {
      return currentUserData && currentUserData.role === 'deputy';
    }

    function isMayor() {
      var name = getDisplayName();
      return name.toLowerCase() === 'w00fla';
    }

    function hasMayorRights() {
      return isMayor() || isDeputy();
    }

    function isStaff() {
      return isAdmin() || isMayor() || isDeputy();
    }

    function getDisplayName() {
      if (currentUserData && currentUserData.username) return currentUserData.username;
      if (currentUserData && currentUserData.displayName) return currentUserData.displayName;
      if (currentUser && currentUser.displayName) return currentUser.displayName;
      if (currentUser && currentUser.email) return currentUser.email.split('@')[0];
      return 'Гражданин';
    }

    /* ==================== HEADER AUTH BUTTON ==================== */
    function updateNavAuthButton() {
      var btn = document.getElementById('navAuthBtn');
      if (!btn) return;

      if (currentUser) {
        var name = getDisplayName();
        var initials = name.substring(0, 2).toUpperCase();
        btn.className = 'nav-auth-btn logged-in';
        btn.innerHTML = 
          '<div class="nav-user-avatar">' + esc(initials) + '</div>' +
          '<span class="auth-text">' + esc(name) + '</span>';
      } else {
        btn.className = 'nav-auth-btn';
        btn.innerHTML = '<span class="auth-icon">👤</span><span class="auth-text">Войти</span>';
      }
    }

    function handleNavAuthClick() {
      if (currentUser) {
        openProfile();
      } else {
        openAuth('login');
      }
    }

    /* ==================== PROFILE MODAL ==================== */
    function openProfile() {
      if (!currentUser) return;

      // Update profile info
      var name = getDisplayName();
      document.getElementById('profileAvatar').textContent = name.substring(0, 2).toUpperCase();
      document.getElementById('profileName').textContent = name;
      document.getElementById('profileRole').textContent = isMayor() ? '👑 Мэр Луриксбурга' : isDeputy() ? '⭐ Зам мэра' : isSheriff() ? '🔰 Шериф' : (currentUserData && currentUserData.role === 'admin') ? '⚔ Администратор' : '🛡️ Гражданин';

      // Clear fields
      document.getElementById('newPass1').value = '';
      document.getElementById('newPass2').value = '';
      document.getElementById('profileError').textContent = '';
      document.getElementById('profileSuccess').textContent = '';

      document.getElementById('profileModal').classList.add('open');
    }

    function closeProfile() {
      document.getElementById('profileModal').classList.remove('open');
      document.getElementById('newPass1').value = '';
      document.getElementById('newPass2').value = '';
      document.getElementById('profileError').textContent = '';
      document.getElementById('profileSuccess').textContent = '';
    }

    // Click outside to close
    document.getElementById('profileModal').addEventListener('click', function(e) {
      if (e.target.id === 'profileModal') closeProfile();
    });

    function changePassword() {
      var pass1 = document.getElementById('newPass1').value;
      var pass2 = document.getElementById('newPass2').value;
      var errEl = document.getElementById('profileError');
      var successEl = document.getElementById('profileSuccess');
      var btn = document.getElementById('savePassBtn');

      errEl.textContent = '';
      successEl.textContent = '';

      // Validation
      if (pass1.length < 6) {
        errEl.textContent = 'Пароль должен быть не короче 6 символов';
        return;
      }

      if (pass1 !== pass2) {
        errEl.textContent = 'Пароли не совпадают';
        return;
      }

      if (!auth.currentUser) {
        errEl.textContent = 'Сессия истекла. Войдите заново.';
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="loading-spinner"></span> Сохранение...';

      // Firebase updatePassword
      auth.currentUser.updatePassword(pass1)
        .then(function() {
          console.log('[Password Update OK]');
          btn.disabled = false;
          btn.innerHTML = '🔑 Сохранить новый пароль';
          document.getElementById('newPass1').value = '';
          document.getElementById('newPass2').value = '';
          successEl.textContent = '✅ Пароль успешно обновлён!';
          showToast('🔑 Пароль успешно изменён!');
        })
        .catch(function(error) {
          console.error('[Password Update FAIL]', error.code, error.message);
          btn.disabled = false;
          btn.innerHTML = '🔑 Сохранить новый пароль';
          
          var errorMsg = 'Ошибка';
          if (error.code === 'auth/requires-recent-login') {
            errorMsg = 'Требуется повторный вход. Выйдите и войдите заново';
          } else if (error.code === 'auth/weak-password') {
            errorMsg = 'Слишком слабый пароль';
          }
          errEl.textContent = errorMsg + '  [' + error.code + ']';
        });
    }

    function logoutFromProfile() {
      closeProfile();
      logout();
    }

    /* ==================== ROLE MANAGER (Mayor only) ==================== */
    function openRoleManager() {
      if (!isStaff()) { showToast('⛔ Только для администрации', true); return; }

      var assignWrap = document.getElementById('roleAssignWrap');
      var titleEl = document.getElementById('roleModalTitle');
      var subEl = document.getElementById('roleModalSub');

      if (hasMayorRights()) {
        assignWrap.style.display = 'block';
        titleEl.textContent = '👑 Управление ролями';
        subEl.textContent = 'Назначение ролей и список пользователей';
        document.getElementById('roleNick').value = '';
        document.getElementById('roleError').textContent = '';
        document.getElementById('roleSuccess').textContent = '';
      } else {
        assignWrap.style.display = 'none';
        titleEl.textContent = '📋 Зарегистрированные пользователи';
        subEl.textContent = 'Просмотр списка зарегистрированных пользователей';
      }

      document.getElementById('roleModal').classList.add('open');
      loadRegisteredUsers();
      setTimeout(function() {
        if (hasMayorRights()) document.getElementById('roleNick').focus();
      }, 100);
    }

    function closeRoleManager() {
      document.getElementById('roleModal').classList.remove('open');
    }

    document.getElementById('roleModal').addEventListener('click', function(e) {
      if (e.target.id === 'roleModal') closeRoleManager();
    });

    function loadRegisteredUsers() {
      var el = document.getElementById('regUsersList');
      el.innerHTML = '<div class="citizens-empty"><span class="loading-spinner"></span> Загрузка...</div>';

      db.collection('users').get()
        .then(function(snap) {
          if (snap.empty) {
            el.innerHTML = '<div class="citizens-empty">Нет зарегистрированных пользователей</div>';
            return;
          }
          var users = [];
          snap.forEach(function(d) {
            var data = d.data();
            users.push({
              uid: d.id,
              name: data.username || data.displayName || '—',
              role: data.role || 'user',
              previousRole: data.previousRole || 'user',
              customTag: data.customTag || '',
              customTagColor: data.customTagColor || ''
            });
          });
          // Мэр первым, потом зам, потом админы, потом шерифы, потом обычные, потом заблокированные
          users.sort(function(a, b) {
            var order = { mayor: 0, deputy: 1, admin: 2, sheriff: 3, user: 4, deleted: 5 };
            var oa = a.name.toLowerCase() === 'w00fla' ? 0 : (order[a.role] !== undefined ? order[a.role] : 4);
            var ob = b.name.toLowerCase() === 'w00fla' ? 0 : (order[b.role] !== undefined ? order[b.role] : 4);
            return oa - ob || a.name.localeCompare(b.name);
          });

          el.innerHTML = users.map(function(u) {
            var ini = u.name.substring(0, 2).toUpperCase();
            var isMyr = u.name.toLowerCase() === 'w00fla';
            var isBlocked = u.role === 'deleted';
            var tagClass = isMyr ? 'reg-tag-mayor' : (isBlocked ? 'reg-tag-deleted' : (u.role === 'deputy' ? 'reg-tag-deputy' : (u.role === 'admin' ? 'reg-tag-admin' : (u.role === 'sheriff' ? 'reg-tag-sheriff' : 'reg-tag-user'))));
            var tagText = isMyr ? '👑 Мэр' : (isBlocked ? '🚫 Заблокирован' : (u.role === 'deputy' ? '⭐ Зам' : (u.role === 'admin' ? '⚔ Админ' : (u.role === 'sheriff' ? '🔰 Шериф' : 'Пользователь'))));
            var actionBtn = '';
            if (!isMyr && isBlocked) {
              actionBtn = '<button class="citizen-remove" onclick="unblockUserAccount(\'' + u.uid + '\',\'' + esc(u.name) + '\',\'' + esc(u.previousRole) + '\')" title="Разблокировать">✅</button>';
              if (hasMayorRights()) {
                actionBtn += '<button class="citizen-remove" onclick="purgeUserDoc(\'' + u.uid + '\',\'' + esc(u.name) + '\')" title="Удалить из базы полностью">🗑️</button>';
              }
            } else if (!isMyr) {
              actionBtn = '<button class="citizen-remove" onclick="blockUserAccount(\'' + u.uid + '\',\'' + esc(u.name) + '\',\'' + esc(u.role) + '\')" title="Заблокировать">🚫</button>';
              if (hasMayorRights()) {
                actionBtn += '<button class="citizen-remove" onclick="purgeUserDoc(\'' + u.uid + '\',\'' + esc(u.name) + '\')" title="Удалить из базы полностью">🗑️</button>';
              }
            }
            // Кликабельный тег роли (только для Мэра/Зама, и не для самого Мэра w00fla, и не для заблокированных)
            var roleTag = '';
            if (hasMayorRights() && !isMyr && !isBlocked) {
              roleTag = '<span class="reg-user-role-tag clickable ' + tagClass + '" onclick="showRoleSelect(this,\'' + u.uid + '\',\'' + esc(u.name) + '\',\'' + u.role + '\')" title="Нажмите чтобы сменить роль">' + tagText + '</span>';
            } else {
              roleTag = '<span class="reg-user-role-tag ' + tagClass + '">' + tagText + '</span>';
            }
            var customBadge = u.customTag ? '<span class="role-badge badge-custom" style="background:' + u.customTagColor + '20; border:1px solid ' + u.customTagColor + '55; color:' + u.customTagColor + ';">' + esc(u.customTag) + '</span>' : '';
            return '<div class="reg-user-row">' +
              '<div class="reg-user-avatar-sm">' + esc(ini) + '</div>' +
              '<span class="reg-user-name">' + esc(u.name) + '</span>' +
              roleTag + customBadge +
              actionBtn +
              '</div>';
          }).join('');
        })
        .catch(function(e) {
          console.error('[Load Users Error]', e);
          el.innerHTML = '<div class="citizens-empty">Ошибка загрузки: ' + (e.message || e.code) + '</div>';
        });
    }

    function showRoleSelect(el, uid, name, currentRole) {
      // Заменяем тег на select прямо в строке
      var roles = [
        { val: 'user', txt: 'Пользователь' },
        { val: 'deputy', txt: '⭐ Зам' },
        { val: 'sheriff', txt: '🔰 Шериф' },
        { val: 'admin', txt: '⚔ Админ' }
      ];
      var sel = document.createElement('select');
      sel.className = 'inline-role-select';
      roles.forEach(function(r) {
        var opt = document.createElement('option');
        opt.value = r.val;
        opt.textContent = r.txt;
        if (r.val === currentRole) opt.selected = true;
        sel.appendChild(opt);
      });
      el.replaceWith(sel);
      sel.focus();

      sel.addEventListener('change', function() {
        var newRole = sel.value;
        db.collection('users').doc(uid).update({ role: newRole })
          .then(function() {
            var roleNames = { admin: 'Администратор', sheriff: 'Шериф', deputy: 'Зам', user: 'Пользователь' };
            showToast('👑 ' + name + ' → ' + (roleNames[newRole] || newRole));
            writeLog('assign_role', name + ' → ' + (roleNames[newRole] || newRole));
            loadRegisteredUsers();
          })
          .catch(function(e) {
            showToast('❌ Ошибка: ' + (e.message || e.code), true);
            loadRegisteredUsers();
          });
      });

      // Если кликнул мимо — вернуть обратно
      sel.addEventListener('blur', function() {
        loadRegisteredUsers();
      });
    }

    // ===== CUSTOM TAGS =====
    var selectedTagColor = '#E040FB';

    function pickTagColor(el) {
      document.querySelectorAll('.tag-color-btn').forEach(function(b) { b.classList.remove('selected'); });
      el.classList.add('selected');
      selectedTagColor = el.getAttribute('data-color');
    }

    function assignCustomTag() {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      var nick = document.getElementById('tagNick').value.trim();
      var text = document.getElementById('tagText').value.trim();
      var errEl = document.getElementById('tagError');
      var successEl = document.getElementById('tagSuccess');
      errEl.textContent = ''; successEl.textContent = '';

      if (nick.length < 2) { errEl.textContent = 'Введите ник'; return; }
      if (text.length < 1) { errEl.textContent = 'Введите текст тега'; return; }

      db.collection('users').where('username', '==', nick).get()
        .then(function(snap) {
          if (snap.empty) { errEl.textContent = 'Игрок «' + nick + '» не найден'; return; }
          return db.collection('users').doc(snap.docs[0].id).update({
            customTag: text,
            customTagColor: selectedTagColor
          }).then(function() {
            successEl.textContent = '✅ Тег «' + text + '» назначен для ' + nick;
            showToast('🏷️ Тег обновлён для ' + nick);
            writeLog('set_tag', nick + ' → «' + text + '»');
            loadUsersCache();
            loadRegisteredUsers();
          });
        })
        .catch(function(e) { errEl.textContent = 'Ошибка: ' + (e.message || e.code); });
    }

    function removeCustomTag() {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      var nick = document.getElementById('tagNick').value.trim();
      var errEl = document.getElementById('tagError');
      var successEl = document.getElementById('tagSuccess');
      errEl.textContent = ''; successEl.textContent = '';

      if (nick.length < 2) { errEl.textContent = 'Введите ник'; return; }

      db.collection('users').where('username', '==', nick).get()
        .then(function(snap) {
          if (snap.empty) { errEl.textContent = 'Игрок «' + nick + '» не найден'; return; }
          return db.collection('users').doc(snap.docs[0].id).update({
            customTag: firebase.firestore.FieldValue.delete(),
            customTagColor: firebase.firestore.FieldValue.delete()
          }).then(function() {
            successEl.textContent = '✅ Тег убран у ' + nick;
            showToast('🏷️ Тег убран у ' + nick);
            writeLog('remove_tag', nick);
            loadUsersCache();
            loadRegisteredUsers();
          });
        })
        .catch(function(e) { errEl.textContent = 'Ошибка: ' + (e.message || e.code); });
    }

    function assignRole() {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      var nick = document.getElementById('roleNick').value.trim();
      var role = document.getElementById('roleSelect').value;
      var errEl = document.getElementById('roleError');
      var successEl = document.getElementById('roleSuccess');
      errEl.textContent = '';
      successEl.textContent = '';

      if (nick.length < 2) { errEl.textContent = 'Введите ник игрока'; return; }

      // Find user in Firestore by username
      db.collection('users').where('username', '==', nick).get()
        .then(function(snap) {
          if (snap.empty) {
            errEl.textContent = 'Игрок «' + nick + '» не найден в базе';
            return;
          }
          var userDoc = snap.docs[0];
          return db.collection('users').doc(userDoc.id).update({ role: role })
            .then(function() {
              var roleNames = { admin: 'Администратор', sheriff: 'Шериф', deputy: 'Зам', user: 'Пользователь' };
              successEl.textContent = '✅ ' + nick + ' → роль «' + (roleNames[role] || role) + '» назначена!';
              showToast('👑 Роль обновлена для ' + nick);
              writeLog('assign_role', nick + ' → ' + (roleNames[role] || role));
              loadRegisteredUsers();
            });
        })
        .catch(function(e) {
          console.error('[Role Assign Error]', e);
          errEl.textContent = 'Ошибка: ' + (e.message || e.code);
        });
    }

    function blockUserAccount(uid, name, previousRole) {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      if (!confirm('Заблокировать аккаунт «' + name + '»?\n\n• Игрок будет выброшен при попытке входа\n• Все оценки будут удалены\n• Ник останется занят, пока вы не удалите пользователя вручную в Firebase Authentication')) return;

      // Пометить аккаунт как заблокированный
      db.collection('users').doc(uid).set({
        username: name,
        role: 'deleted',
        previousRole: previousRole || 'user',
        deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
        deletedBy: getDisplayName()
      }, { merge: true })
      .then(function() {
        // Удалить все оценки этого пользователя
        return db.collection('ratings').where('oderId', '==', uid).get();
      })
      .then(function(snap) {
        if (snap.empty) return;
        var batch = db.batch();
        snap.forEach(function(d) { batch.delete(d.ref); });
        return batch.commit();
      })
      .then(function() {
        showToast('🚫 Аккаунт «' + name + '» заблокирован');
        writeLog('block_user', 'Заблокирован: ' + name);
        loadRegisteredUsers();
      })
      .catch(function(e) {
        console.error('[Block User Error]', e);
        showToast('❌ Ошибка: ' + (e.message || e.code), true);
      });
    }

    function purgeUserDoc(uid, name) {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      if (!confirm('Полностью удалить документ «' + name + '» из Firestore?\n\nЭто удалит запись из коллекции users и все оценки.\nИспользуйте после удаления аккаунта из Firebase Authentication.')) return;

      db.collection('users').doc(uid).delete()
        .then(function() {
          return db.collection('ratings').where('oderId', '==', uid).get();
        })
        .then(function(snap) {
          if (snap.empty) return;
          var batch = db.batch();
          snap.forEach(function(d) { batch.delete(d.ref); });
          return batch.commit();
        })
        .then(function() {
        showToast('🗑️ Документ «' + name + '» удалён из базы');
        writeLog('purge_user', 'Удалён из базы: ' + name);
        loadRegisteredUsers();
        })
        .catch(function(e) {
          console.error('[Purge User Error]', e);
          showToast('❌ Ошибка: ' + (e.message || e.code), true);
        });
    }

    function unblockUserAccount(uid, name, previousRole) {
      if (!hasMayorRights()) { showToast('⛔ Только для Мэра и Зама', true); return; }
      if (!confirm('Разблокировать аккаунт «' + name + '»?')) return;

      db.collection('users').doc(uid).update({
        role: previousRole || 'user',
        previousRole: firebase.firestore.FieldValue.delete(),
        deletedAt: firebase.firestore.FieldValue.delete(),
        deletedBy: firebase.firestore.FieldValue.delete()
      })
      .then(function() {
        showToast('✅ Аккаунт «' + name + '» разблокирован');
        writeLog('unblock_user', 'Разблокирован: ' + name);
        loadRegisteredUsers();
      })
      .catch(function(e) {
        console.error('[Unblock User Error]', e);
        showToast('❌ Ошибка: ' + (e.message || e.code), true);
      });
    }

    /* ==================== CITIZENS ==================== */
    var citizensList = [];

    function loadCitizens() {
      db.collection('citizens').orderBy('addedAt', 'desc').get()
        .then(function(snap) {
          citizensList = [];
          snap.forEach(function(d) {
            citizensList.push({
              id: d.id,
              name: d.data().name,
              post: d.data().post || 'citizen'
            });
          });
          renderCitizens();
        })
        .catch(function() {
          // If orderBy fails (no index), try without it
          db.collection('citizens').get().then(function(snap) {
            citizensList = [];
            snap.forEach(function(d) {
              citizensList.push({
                id: d.id,
                name: d.data().name,
                post: d.data().post || 'citizen'
              });
            });
            renderCitizens();
          });
        });
    }

    function renderCitizens() {
      var el = document.getElementById('citizensList');
      var wrap = document.getElementById('addCitizenWrap');
      if (wrap) wrap.style.display = isAdmin() ? 'block' : 'none';

      if (!citizensList.length) {
        el.innerHTML = '<div class="citizens-empty">Пока нет зарегистрированных жителей</div>';
        return;
      }
      var adm = isAdmin();
      var postMap = {
        citizen: '🛡️ Житель',
        mayor: '👑 Мэр',
        deputy: '⭐ Зам',
        sheriff: '🔰 Шериф',
        judge: '⚖️ Судья'
      };
      var postOrder = { mayor: 0, deputy: 1, sheriff: 2, judge: 3, citizen: 4 };
      var sorted = citizensList.slice().sort(function(a, b) {
        var oa = postOrder[a.post] !== undefined ? postOrder[a.post] : 4;
        var ob = postOrder[b.post] !== undefined ? postOrder[b.post] : 4;
        if (oa !== ob) return oa - ob;
        return a.name.localeCompare(b.name);
      });
      el.innerHTML = '<div class="citizens-grid">' + sorted.map(function(c) {
        var ini = c.name.substring(0, 2).toUpperCase();
        return '<div class="citizen-card">' +
          '<div class="citizen-avatar">' + esc(ini) + '</div>' +
          '<div><div class="citizen-name">' + esc(c.name) + '</div>' +
          '<div class="citizen-role">' + (postMap[c.post] || '🛡️ Житель') + '</div></div>' +
          (adm ? '<button class="citizen-remove" onclick="removeCitizen(\'' + c.id + '\',\'' + esc(c.name) + '\')" title="Удалить">✕</button>' : '') +
          '</div>';
      }).join('') + '</div>';
    }

    function addCitizen() {
      var inp = document.getElementById('newCitizenName');
      var postInp = document.getElementById('newCitizenPost');
      var name = inp.value.trim();
      var post = postInp.value;
      if (name.length < 2) { showToast('⚠️ Введите ник (мин. 2 символа)', true); return; }
      if (!isAdmin()) { showToast('⛔ Только для админа', true); return; }

      db.collection('citizens').add({
        name: name,
        post: post,
        addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        addedBy: getDisplayName()
      }).then(function() {
        inp.value = '';
        postInp.value = 'citizen';
        var postNames = { citizen: 'жители', mayor: 'мэры', deputy: 'замы', sheriff: 'шерифы', judge: 'судьи' };
        showToast('✅ ' + name + ' добавлен в ' + (postNames[post] || 'жители') + '!');
        loadCitizens();
      }).catch(function(e) {
        showToast('❌ Ошибка: ' + e.message, true);
      });
    }

    function removeCitizen(id, name) {
      if (!isAdmin()) return;
      if (!confirm('Удалить ' + name + ' из жителей?')) return;
      db.collection('citizens').doc(id).delete().then(function() {
        showToast('🗑️ ' + name + ' удалён из списка');
        loadCitizens();
      });
    }

    // Enter key for adding citizen
    document.getElementById('newCitizenName').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addCitizen();
    });

    // Check if a username is a citizen
    function isCitizen(username) {
      return citizensList.some(function(c) {
        return c.name.toLowerCase() === username.toLowerCase();
      });
    }

    // Load citizens on page load
    loadCitizens();

    /* ==================== BLACKLIST ==================== */
    var blacklistData = [];

    function loadBlacklist() {
      db.collection('blacklist').get()
        .then(function(snap) {
          blacklistData = [];
          snap.forEach(function(d) {
            var data = d.data();
            blacklistData.push({ id: d.id, name: data.name, reason: data.reason || '' });
          });
          renderBlacklist();
        })
        .catch(function(e) {
          console.error('[Blacklist load error]', e);
        });
    }

    function renderBlacklist() {
      var el = document.getElementById('blacklistList');
      var wrap = document.getElementById('addBlacklistWrap');
      if (wrap) wrap.style.display = isAdmin() ? 'block' : 'none';

      if (!blacklistData.length) {
        el.innerHTML = '<div class="citizens-empty">Чёрный список пуст — так держать!</div>';
        return;
      }
      var adm = isAdmin();
      el.innerHTML = '<div class="citizens-grid">' + blacklistData.map(function(b) {
        var ini = b.name.substring(0, 2).toUpperCase();
        return '<div class="blacklist-card">' +
          '<div class="blacklist-avatar">' + esc(ini) + '</div>' +
          '<div><div class="blacklist-name">' + esc(b.name) + '</div>' +
          (b.reason ? '<div class="blacklist-reason">Причина: ' + esc(b.reason) + '</div>' : '<div class="blacklist-reason">Без указания причины</div>') +
          '</div>' +
          (adm ? '<button class="citizen-remove" onclick="removeFromBlacklist(\'' + b.id + '\',\'' + esc(b.name) + '\')" title="Убрать из ЧС">✕</button>' : '') +
          '</div>';
      }).join('') + '</div>';
    }

    function addToBlacklist() {
      if (!isAdmin()) { showToast('⛔ Только для админа', true); return; }
      var nameInp = document.getElementById('blacklistName');
      var reasonInp = document.getElementById('blacklistReason');
      var name = nameInp.value.trim();
      var reason = reasonInp.value.trim();
      if (name.length < 2) { showToast('⚠️ Введите ник (мин. 2 символа)', true); return; }

      db.collection('blacklist').add({
        name: name,
        reason: reason,
        addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        addedBy: getDisplayName()
      }).then(function() {
        nameInp.value = '';
        reasonInp.value = '';
        showToast('🚫 ' + name + ' добавлен в чёрный список');
        loadBlacklist();
      }).catch(function(e) {
        showToast('❌ Ошибка: ' + e.message, true);
      });
    }

    function removeFromBlacklist(id, name) {
      if (!isAdmin()) return;
      if (!confirm('Убрать ' + name + ' из чёрного списка?')) return;
      db.collection('blacklist').doc(id).delete().then(function() {
        showToast('✅ ' + name + ' убран из чёрного списка');
        loadBlacklist();
      });
    }

    function isBlacklisted(username) {
      return blacklistData.some(function(b) {
        return b.name.toLowerCase() === username.toLowerCase();
      });
    }

    document.getElementById('blacklistName').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addToBlacklist();
    });

    loadBlacklist();

    /* ==================== RENDER FUNCTIONS ==================== */
    function renderAuthBar() {
      const bar = document.getElementById('authBar');
      if (currentUser) {
        bar.innerHTML =
          '<div class="auth-user">👤 Вы вошли как <span class="uname">' + esc(getDisplayName()) + '</span>' +
          (isMayor() ? '<span class="admin-badge" style="background:rgba(255,215,0,0.15);border-color:rgba(255,215,0,0.4);color:#FFD700;">👑 Мэр</span>' : isDeputy() ? '<span class="admin-badge" style="background:rgba(255,140,0,0.15);border-color:rgba(255,140,0,0.35);color:#FFB74D;">⭐ Зам</span>' : isSheriff() ? '<span class="admin-badge" style="background:rgba(66,165,245,0.15);border-color:rgba(66,165,245,0.4);color:#64B5F6;">🔰 Шериф</span>' : (currentUserData && currentUserData.role === 'admin') ? '<span class="admin-badge">⚔ Администратор</span>' : '') + '</div>' +
          '<button class="btn-gold ghost" onclick="logout()">Выйти</button>';
      } else {
        bar.innerHTML =
          '<div class="auth-user">🔒 Вы не авторизованы — оценку оставить нельзя</div>' +
          '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
          '<button class="btn-gold" onclick="openAuth(\'register\')">Регистрация</button>' +
          '<button class="btn-gold ghost" onclick="openAuth(\'login\')">Вход</button></div>';
      }
      // Also update header auth button
      updateNavAuthButton();
      // Show/hide mayor role button
      var mayorBtn = document.getElementById('mayorRoleBtn');
      if (mayorBtn) mayorBtn.style.display = (currentUser && isStaff()) ? 'inline-flex' : 'none';
      // Refresh citizens & blacklist (admin forms visibility)
      renderCitizens();
      renderBlacklist();
    }

    function renderSummary() {
      const n = ratingsData.length;
      const counts = [0, 0, 0, 0, 0];
      let sum = 0;
      ratingsData.forEach(r => { sum += r.stars; counts[r.stars - 1]++; });
      const avg = n ? (sum / n) : 0;

      document.getElementById('avgScore').textContent = n ? avg.toFixed(1) : '—';
      document.getElementById('avgStars').textContent = starStr(Math.round(avg));
      document.getElementById('avgCount').textContent = n
        ? 'На основе ' + n + ' ' + plural(n, 'оценки', 'оценок', 'оценок')
        : 'Пока нет оценок';

      let html = '';
      for (let s = 5; s >= 1; s--) {
        const pct = n ? (counts[s - 1] / n * 100) : 0;
        html += '<div class="bar-row"><div class="lbl">' + s + '★</div>' +
          '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="cnt">' + counts[s - 1] + '</div></div>';
      }
      document.getElementById('bars').innerHTML = html;
    }

    function renderRateArea() {
      const area = document.getElementById('rateArea');
      if (!currentUser) {
        area.innerHTML =
          '<div class="locked-note"><span class="lock-ico">🔐</span>' +
          'Чтобы оставить оценку города, необходимо <strong style="color:var(--gold-light)">зарегистрироваться</strong> или войти в аккаунт.<br><br>' +
          '<button class="btn-gold" onclick="openAuth(\'register\')">Зарегистрироваться</button></div>';
        return;
      }

      // Blacklist check
      if (isBlacklisted(getDisplayName())) {
        area.innerHTML =
          '<div class="banned-note"><span class="ban-ico">🚫</span>' +
          'Вы находитесь в <strong style="color:#EF5350;">чёрном списке</strong> и не можете оставлять оценки.<br>' +
          '<span style="font-size:0.8rem; color:var(--text-muted);">Обратитесь к администрации для разблокировки.</span><br><br>' +
          '<a href="https://t.me/+EHebJtwQS5hiYjgy" target="_blank" class="btn-gold" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;">💬 Написать в Telegram</a><br><br>' +
          '<span style="font-size:0.75rem; color:var(--text-muted); line-height:1.5; display:block;">Если ссылка не работает, скопируйте её из адресной строки браузера после нажатия на кнопку и вставьте в чат избранного Telegram.</span></div>';
        return;
      }

      const mine = ratingsData.find(r => r.oderId === currentUser.uid);
      if (mine && pickedStars === 0) pickedStars = mine.stars;

      let stars = '<div class="stars-input" id="starsInput">';
      for (let i = 1; i <= 5; i++) {
        stars += '<span class="star' + (i <= pickedStars ? ' on' : '') + '" data-v="' + i + '">★</span>';
      }
      stars += '</div>';

      area.innerHTML =
        stars +
        '<div class="stars-hint" id="starsHint">' + hintFor(pickedStars) + '</div>' +
        '<div class="field"><label for="revText">Комментарий (необязательно)</label>' +
        '<textarea id="revText" rows="3" maxlength="400" placeholder="Что вы думаете о городе Луриксбург?">' +
        (mine ? esc(mine.text || '') : '') + '</textarea></div>' +
        '<div style="text-align:center; margin-top:8px;">' +
        '<button class="btn-gold" id="submitBtn" onclick="submitRating()">' +
        (mine ? '✏️ Обновить мою оценку' : '📩 Отправить оценку') + '</button></div>';

      document.querySelectorAll('#starsInput .star').forEach(st => {
        st.addEventListener('click', () => {
          pickedStars = +st.dataset.v;
          document.querySelectorAll('#starsInput .star').forEach(s2 => {
            s2.classList.toggle('on', +s2.dataset.v <= pickedStars);
          });
          document.getElementById('starsHint').textContent = hintFor(pickedStars);
        });
      });
    }

    function hintFor(v) {
      return ['Выберите количество звёзд', '⭐ Ужасно', '⭐⭐ Слабо', '⭐⭐⭐ Нормально', '⭐⭐⭐⭐ Хорошо', '⭐⭐⭐⭐⭐ Превосходно!'][v];
    }

    async function submitRating() {
      if (!currentUser) { openAuth('register'); return; }
      if (!db) { showToast('❌ База данных недоступна', true); return; }
      if (isBlacklisted(getDisplayName())) { showToast('🚫 Вы в чёрном списке', true); return; }
      if (!pickedStars) { showToast('⚠️ Сначала выберите количество звёзд', true); return; }

      // Защита от спама: минимум 10 секунд между отправками
      var now = Date.now();
      if (now - lastRatingSubmit < 10000) {
        showToast('⏳ Слишком часто — подождите 10 секунд', true);
        return;
      }
      lastRatingSubmit = now;

      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-spinner"></span> Сохранение...';

      const text = (document.getElementById('revText').value || '').trim();
      const existing = ratingsData.find(r => r.oderId === currentUser.uid);

      try {
        const data = {
          oderId: currentUser.uid,
          user: getDisplayName(),
          stars: pickedStars,
          text: text,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          role: currentUserData?.role || 'user'
        };

        if (existing) {
          data.edited = true;
          await db.collection('ratings').doc(existing.id).update(data);
          showToast('✅ Оценка обновлена!');
        } else {
          await db.collection('ratings').add(data);
          showToast('✅ Спасибо за вашу оценку!');
        }
      } catch (e) {
        console.error(e);
        showToast('❌ Ошибка сохранения', true);
      }

      btn.disabled = false;
      btn.textContent = '📩 Отправить оценку';
    }

    async function deleteRating(id) {
      if (!db) { showToast('❌ База данных недоступна', true); return; }
      const target = ratingsData.find(r => r.id === id);
      if (!target) return;
      if (!(isAdmin() || (currentUser && target.oderId === currentUser.uid))) {
        showToast('⛔ Недостаточно прав', true);
        return;
      }
      if (!confirm('Удалить оценку от ' + target.user + '?')) return;

      try {
        await db.collection('ratings').doc(id).delete();
        if (target.oderId === currentUser?.uid) pickedStars = 0;
        showToast('🗑️ Оценка удалена');
        writeLog('delete_rating', 'Удалена оценка от: ' + target.user);
      } catch (e) {
        console.error(e);
        showToast('❌ Ошибка удаления', true);
      }
    }

    // Найти ник по UID (из кэша ratingsData или показать короткий UID)
    function findUsernameByUid(uid) {
      for (var i = 0; i < ratingsData.length; i++) {
        if (ratingsData[i].oderId === uid) return ratingsData[i].user;
      }
      return uid.substring(0, 8) + '…';
    }

    // Cache of user data for custom tags
    var usersCache = {};
    function loadUsersCache() {
      db.collection('users').get().then(function(snap) {
        usersCache = {};
        snap.forEach(function(d) {
          var data = d.data();
          var name = data.username || data.displayName || '';
          if (name) usersCache[name.toLowerCase()] = data;
        });
      });
    }
    loadUsersCache();

    function getCustomTag(username) {
      var u = usersCache[username.toLowerCase()];
      if (u && u.customTag) {
        return '<span class="role-badge badge-custom" style="background:' + u.customTagColor + '20; border:1px solid ' + u.customTagColor + '55; color:' + u.customTagColor + ';">' + esc(u.customTag) + '</span>';
      }
      return '';
    }

    function removeVote(reviewId, targetUid, type) {
      if (!(isAdmin() || isMayor())) { showToast('⛔ Только для админа', true); return; }
      var review = ratingsData.find(function(r) { return r.id === reviewId; });
      if (!review) return;

      var upvotes = (review.upvotes && Array.isArray(review.upvotes)) ? review.upvotes.slice() : [];
      var downvotes = (review.downvotes && Array.isArray(review.downvotes)) ? review.downvotes.slice() : [];

      if (type === 'up') {
        var i = upvotes.indexOf(targetUid);
        if (i !== -1) upvotes.splice(i, 1);
      } else {
        var j = downvotes.indexOf(targetUid);
        if (j !== -1) downvotes.splice(j, 1);
      }

      db.collection('ratings').doc(reviewId).update({
        upvotes: upvotes,
        downvotes: downvotes
      }).then(function() {
        showToast('✅ Голос удалён');
      }).catch(function(e) {
        console.error('[Remove Vote Error]', e);
        showToast('❌ Ошибка', true);
      });
    }

    function replyToReview(reviewId) {
      if (!isStaff()) { showToast('⛔ Только для администрации', true); return; }
      var textarea = document.getElementById('rreply-' + reviewId);
      if (!textarea) return;
      var text = textarea.value.trim();
      if (text.length < 1) { showToast('⚠️ Введите ответ', true); return; }

      db.collection('ratings').doc(reviewId).update({
        adminReply: text,
        adminReplyBy: getDisplayName(),
        adminReplyAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function() {
        showToast('💬 Ответ опубликован!');
        writeLog('admin_reply', 'Ответ на отзыв: ' + reviewId);
      }).catch(function(e) {
        console.error('[Reply Error]', e);
        showToast('❌ Ошибка: ' + (e.message || e.code), true);
      });
    }

    function editAdminReply(reviewId) {
      if (!isStaff()) return;
      var review = ratingsData.find(function(r) { return r.id === reviewId; });
      if (!review) return;
      var newText = prompt('Изменить ответ администрации:', review.adminReply || '');
      if (newText === null) return;
      newText = newText.trim();
      if (newText.length < 1) { showToast('⚠️ Ответ не может быть пустым', true); return; }

      db.collection('ratings').doc(reviewId).update({
        adminReply: newText,
        adminReplyBy: getDisplayName(),
        adminReplyAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function() {
        showToast('✏️ Ответ изменён!');
        writeLog('edit_reply', 'Изменён ответ на отзыв: ' + reviewId);
      }).catch(function(e) {
        showToast('❌ Ошибка: ' + (e.message || e.code), true);
      });
    }

    function deleteAdminReply(reviewId) {
      if (!isStaff()) return;
      if (!confirm('Удалить ответ администрации?')) return;

      db.collection('ratings').doc(reviewId).update({
        adminReply: firebase.firestore.FieldValue.delete(),
        adminReplyBy: firebase.firestore.FieldValue.delete(),
        adminReplyAt: firebase.firestore.FieldValue.delete()
      }).then(function() {
        showToast('🗑️ Ответ удалён');
        writeLog('delete_reply', 'Удалён ответ на отзыв: ' + reviewId);
      }).catch(function(e) {
        showToast('❌ Ошибка: ' + (e.message || e.code), true);
      });
    }

    function voteReview(reviewId, direction) {
      if (!currentUser) { showToast('⚠️ Войдите, чтобы голосовать', true); return; }
      var uid = currentUser.uid;
      var review = ratingsData.find(function(r) { return r.id === reviewId; });
      if (!review) return;

      var upvotes = (review.upvotes && Array.isArray(review.upvotes)) ? review.upvotes.slice() : [];
      var downvotes = (review.downvotes && Array.isArray(review.downvotes)) ? review.downvotes.slice() : [];

      if (direction === 'up') {
        var di = downvotes.indexOf(uid);
        if (di !== -1) downvotes.splice(di, 1);
        var li = upvotes.indexOf(uid);
        if (li !== -1) upvotes.splice(li, 1);
        else upvotes.push(uid);
      } else {
        var li2 = upvotes.indexOf(uid);
        if (li2 !== -1) upvotes.splice(li2, 1);
        var di2 = downvotes.indexOf(uid);
        if (di2 !== -1) downvotes.splice(di2, 1);
        else downvotes.push(uid);
      }

      db.collection('ratings').doc(reviewId).update({
        upvotes: upvotes,
        downvotes: downvotes
      }).catch(function(e) {
        console.error('[Vote Error]', e);
        showToast('❌ Ошибка', true);
      });
    }

    function renderReviews() {
      const list = document.getElementById('reviewList');

      if (!ratingsData.length) {
        list.innerHTML = '<div class="empty-note">Пока никто не оценил город. Будьте первым!</div>';
        return;
      }

      const admin = isStaff();
      list.innerHTML = ratingsData
        .slice()
        .sort((a, b) => {
          const ta = a.date?.toMillis ? a.date.toMillis() : (a.date?.seconds ? a.date.seconds * 1000 : 0);
          const tb = b.date?.toMillis ? b.date.toMillis() : (b.date?.seconds ? b.date.seconds * 1000 : 0);
          return tb - ta;
        })
        .map(r => {
          const canDel = admin || (currentUser && r.oderId === currentUser.uid);
          const isMyr = r.user && r.user.toLowerCase() === 'w00fla';
          const isDep = !isMyr && r.role === 'deputy';
          const isAdm = !isMyr && !isDep && r.role === 'admin';
          const isShf = !isMyr && !isDep && r.role === 'sheriff';
          const isBanned = isBlacklisted(r.user);
          const isCtz = !isMyr && !isDep && !isAdm && !isShf && !isBanned && isCitizen(r.user);
          let dateStr = '';
          try {
            if (r.date && r.date.toDate) dateStr = fmtDate(r.date.toDate());
            else if (r.date && r.date.seconds) dateStr = fmtDate(new Date(r.date.seconds * 1000));
          } catch(e) { dateStr = 'Только что'; }
          var roleBadge = '';
          if (isMyr) roleBadge = '<span class="role-badge badge-mayor">👑 Мэр</span>';
          else if (isDep) roleBadge = '<span class="role-badge badge-deputy">⭐ Зам</span>';
          else if (isAdm) roleBadge = '<span class="role-badge badge-admin">⚔ Админ</span>';
          else if (isShf) roleBadge = '<span class="role-badge badge-sheriff">🔰 Шериф</span>';
          else if (isBanned) roleBadge = '<span class="role-badge badge-banned">🚫 Заблокирован</span>';
          else if (isCtz) roleBadge = '<span class="role-badge badge-citizen">🛡️ Житель</span>';
          else roleBadge = '<span class="role-badge badge-guest">Гость</span>';
          var upArr = (r.upvotes && Array.isArray(r.upvotes)) ? r.upvotes : [];
          var downArr = (r.downvotes && Array.isArray(r.downvotes)) ? r.downvotes : [];
          var ups = upArr.length;
          var downs = downArr.length;
          var myUid = currentUser ? currentUser.uid : null;
          var iVotedUp = myUid && upArr.indexOf(myUid) !== -1;
          var iVotedDown = myUid && downArr.indexOf(myUid) !== -1;
          var totalScore = ups - downs;
          var scoreClass = totalScore > 0 ? 'positive' : (totalScore < 0 ? 'negative' : 'zero');
          var scoreText = totalScore > 0 ? '+' + totalScore : '' + totalScore;

          var votesHtml = '<div class="review-votes">' +
            '<button class="vote-btn up' + (iVotedUp ? ' active' : '') + '" onclick="voteReview(\'' + r.id + '\',\'up\')" title="За">▲</button>' +
            '<span class="vote-score ' + scoreClass + '">' + scoreText + '</span>' +
            '<button class="vote-btn down' + (iVotedDown ? ' active' : '') + '" onclick="voteReview(\'' + r.id + '\',\'down\')" title="Против">▼</button>' +
            '</div>';

          // Админ видит кто голосовал + может удалять голоса
          if (admin && (ups > 0 || downs > 0)) {
            votesHtml += '<div class="vote-details">';
            if (ups > 0) {
              votesHtml += '<div class="vote-details-label up-label">▲ За (' + ups + '):</div>';
              upArr.forEach(function(uid) {
                var voterName = findUsernameByUid(uid);
                votesHtml += '<span class="vote-user-tag">' + esc(voterName) +
                  ' <button class="vote-user-remove" onclick="removeVote(\'' + r.id + '\',\'' + uid + '\',\'up\')" title="Удалить голос">✕</button></span>';
              });
            }
            if (downs > 0) {
              votesHtml += '<div class="vote-details-label down-label" style="margin-top:6px;">▼ Против (' + downs + '):</div>';
              downArr.forEach(function(uid) {
                var voterName = findUsernameByUid(uid);
                votesHtml += '<span class="vote-user-tag">' + esc(voterName) +
                  ' <button class="vote-user-remove" onclick="removeVote(\'' + r.id + '\',\'' + uid + '\',\'down\')" title="Удалить голос">✕</button></span>';
              });
            }
            votesHtml += '</div>';
          }

          // Метка "ред." если пользователь редактировал свою оценку
          var editedBadge = r.edited ? '<span class="review-edited">(ред.)</span>' : '';

          // Ответ администрации
          var replyHtml = '';
          if (r.adminReply) {
            var adminBtns = admin ? '<span class="admin-reply-actions">' +
              '<button onclick="editAdminReply(\'' + r.id + '\')" title="Изменить ответ" style="color:var(--gold);">✏️</button>' +
              '<button onclick="deleteAdminReply(\'' + r.id + '\')" title="Удалить ответ" style="color:#EF5350;">🗑️</button>' +
              '</span>' : '';
            replyHtml = '<div class="review-admin-reply">' +
              '<div class="review-admin-reply-label">💬 Ответ ' + esc(r.adminReplyBy || 'Администрации') + adminBtns + '</div>' +
              '<div class="review-admin-reply-text" id="areply-text-' + r.id + '">' + esc(r.adminReply) + '</div></div>';
          } else if (admin) {
            replyHtml = '<div class="review-reply-form">' +
              '<textarea id="rreply-' + r.id + '" placeholder="Ответить на отзыв..."></textarea>' +
              '<button class="btn-gold" onclick="replyToReview(\'' + r.id + '\')">💬 Ответить</button></div>';
          }

          return '<div class="review-item"><div class="review-head">' +
            '<span class="review-author">' + esc(r.user) + '</span>' +
            roleBadge +
            getCustomTag(r.user) +
            '<span class="review-stars">' + starStr(r.stars) + '</span>' +
            editedBadge +
            '<span class="review-date">' + dateStr + '</span>' +
            (canDel ? '<button class="btn-del" onclick="deleteRating(\'' + r.id + '\')">Удалить</button>' : '') +
            '</div>' +
            (r.text ? '<div class="review-text">' + esc(r.text) + '</div>' : '') +
            replyHtml +
            votesHtml +
            '</div>';
        }).join('');
    }

    /* ==================== REALTIME LISTENER ==================== */
    function startRatingsListener() {
      if (!db) {
        console.warn('Firestore not available — ratings disabled');
        document.getElementById('reviewList').innerHTML =
          '<div class="empty-note">⚠️ Не удалось подключиться к базе данных. Проверьте настройки Firebase.</div>';
        return;
      }

      unsubscribeRatings = db.collection('ratings')
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
          fbConnected = true;
          ratingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderSummary();
          renderRateArea();
          renderReviews();
        }, err => {
          console.error('Ratings listener error:', err);
          fbConnected = false;
          // Show user-friendly message
          if (err.code === 'permission-denied') {
            document.getElementById('reviewList').innerHTML =
              '<div class="empty-note">⚠️ Доступ к базе данных запрещён.<br><span style="font-size:0.78rem;color:var(--text-muted);">Проверьте Firestore Security Rules в Firebase Console.</span></div>';
          } else if (err.code === 'unavailable') {
            document.getElementById('reviewList').innerHTML =
              '<div class="empty-note">⚠️ Нет подключения к серверу. Данные будут загружены при восстановлении связи.</div>';
          } else {
            document.getElementById('reviewList').innerHTML =
              '<div class="empty-note">⚠️ Ошибка загрузки отзывов: ' + (err.message || err.code) + '</div>';
          }
        });
    }

    startRatingsListener();

    /* ==================== UTILITIES ==================== */
    function starStr(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
    function esc(s) {
      const d = document.createElement('div');
      d.textContent = String(s);
      return d.innerHTML;
    }
    function fmtDate(d) {
      return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
    function plural(n, one, few, many) {
      const m10 = n % 10, m100 = n % 100;
      if (m10 === 1 && m100 !== 11) return one;
      if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
      return many;
    }
    function showToast(msg, isErr) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.style.background = isErr
        ? 'linear-gradient(135deg,#B71C1C,#C62828)'
        : 'linear-gradient(135deg,#2E7D32,#388E3C)';
      t.classList.add('show');
      clearTimeout(t._tm);
      t._tm = setTimeout(() => t.classList.remove('show'), 2600);
    }

    /* ==================== SEARCH ==================== */
    const searchData = [];

    function buildSearchIndex() {
      searchData.length = 0;
      const sectionMap = {
        'part1': 'Часть I — Устав города',
        'part2': 'Часть II — Билль о правах',
        'part3': 'Часть III — Кодекс штрафов',
        'part4': 'Часть IV — Экономический кодекс',
        'oath': 'Клятва верности'
      };

      document.querySelectorAll('.section[id]').forEach(sec => {
        const sectionId = sec.id;
        const sectionName = sectionMap[sectionId] || sectionId;

        sec.querySelectorAll('.card').forEach(card => {
          const titleEl = card.querySelector('.card-title');
          const title = titleEl ? titleEl.textContent.trim() : '';

          const labels = card.querySelectorAll('.article-label');
          if (labels.length > 0) {
            labels.forEach(label => {
              let text = label.textContent.trim();
              let next = label.nextElementSibling;
              while (next && !next.classList.contains('article-label')) {
                text += ' ' + next.textContent.trim();
                next = next.nextElementSibling;
              }
              searchData.push({
                section: sectionName,
                sectionId: sectionId,
                title: label.textContent.trim(),
                text: text,
                element: label
              });
            });
          } else {
            const text = card.textContent.trim();
            searchData.push({
              section: sectionName,
              sectionId: sectionId,
              title: title,
              text: text,
              element: card
            });
          }

          card.querySelectorAll('.violation-item').forEach(vi => {
            const name = vi.querySelector('.violation-name');
            const penalty = vi.querySelector('.violation-penalty');
            searchData.push({
              section: sectionName,
              sectionId: sectionId,
              title: name ? name.textContent.trim() : '',
              text: (name ? name.textContent : '') + ' ' + (penalty ? penalty.textContent : ''),
              element: vi
            });
          });
        });
      });
    }

    function openSearch() {
      if (searchData.length === 0) buildSearchIndex();
      document.getElementById('searchOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => document.getElementById('searchInput').focus(), 100);
    }

    function closeSearch() {
      document.getElementById('searchOverlay').classList.remove('open');
      document.body.style.overflow = '';
      document.getElementById('searchInput').value = '';
      document.getElementById('searchResults').innerHTML =
        '<div class="search-hint">Начните вводить для поиска по всем разделам Конституции<br><br><kbd>Esc</kbd> — закрыть &nbsp; <kbd>↵</kbd> — перейти к результату</div>';
    }

    document.getElementById('searchOverlay').addEventListener('click', e => {
      if (e.target.id === 'searchOverlay') closeSearch();
    });

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
        closeAuth();
        closeProfile();
        closeRoleManager();
        closeChangelog();
      }
    });

    document.getElementById('searchInput').addEventListener('input', function() {
      const q = this.value.trim().toLowerCase();
      const results = document.getElementById('searchResults');

      if (q.length < 2) {
        results.innerHTML = '<div class="search-hint">Начните вводить для поиска по всем разделам Конституции<br><br><kbd>Esc</kbd> — закрыть &nbsp; <kbd>↵</kbd> — перейти к результату</div>';
        return;
      }

      const found = searchData.filter(item =>
        item.text.toLowerCase().includes(q) || item.title.toLowerCase().includes(q)
      ).slice(0, 12);

      if (found.length === 0) {
        results.innerHTML = '<div class="search-no-results">🔍 Ничего не найдено по запросу «' + esc(q) + '»</div>';
        return;
      }

      results.innerHTML = found.map((item, i) => {
        let snippet = item.text;
        const idx = snippet.toLowerCase().indexOf(q);
        if (idx >= 0) {
          const start = Math.max(0, idx - 60);
          const end = Math.min(snippet.length, idx + q.length + 60);
          snippet = (start > 0 ? '…' : '') +
            esc(snippet.slice(start, idx)) +
            '<mark>' + esc(snippet.slice(idx, idx + q.length)) + '</mark>' +
            esc(snippet.slice(idx + q.length, end)) +
            (end < snippet.length ? '…' : '');
        } else {
          snippet = esc(snippet.slice(0, 120)) + '…';
        }

        return '<div class="search-result-item" data-idx="' + i + '" onclick="goToResult(' + i + ')">' +
          '<div class="search-result-section">' + esc(item.section) + '</div>' +
          '<div class="search-result-title">' + esc(item.title) + '</div>' +
          '<div class="search-result-snippet">' + snippet + '</div>' +
          '</div>';
      }).join('');

      window._searchFound = found;
    });

    function goToResult(idx) {
      if (!window._searchFound || !window._searchFound[idx]) return;
      const item = window._searchFound[idx];
      closeSearch();

      const target = document.getElementById(item.sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (item.element) {
        item.element.style.transition = 'outline 0.3s ease, outline-offset 0.3s ease';
        item.element.style.outline = '2px solid var(--gold)';
        item.element.style.outlineOffset = '4px';
        setTimeout(() => {
          item.element.style.outline = 'none';
          item.element.style.outlineOffset = '0';
        }, 2500);
      }
    }
  


    // ===== BURGER MENU =====
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    // Mobile: burger toggles sidebar drawer
    var navOverlay = document.getElementById('navOverlay');

    burger.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    function closeSidebar() {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeSidebar);
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeSidebar);
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const progressFill = document.getElementById('progressFill');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressFill.style.width = Math.min(scrolled, 100) + '%';
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      const scrollPos = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (link) {
          if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===== COPY OATH =====
    function copyOath() {
      const oathEl = document.getElementById('oathText');
      const text = oathEl.innerText;
      const btn = document.getElementById('btnCopy');

      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '✅ Скопировано!';
        showToast('📋 Текст клятвы скопирован!');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '📋 Скопировать текст клятвы';
        }, 2500);
      }).catch(() => {
        const range = document.createRange();
        range.selectNodeContents(oathEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();

        btn.classList.add('copied');
        btn.innerHTML = '✅ Скопировано!';
        showToast('📋 Текст клятвы скопирован!');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '📋 Скопировать текст клятвы';
        }, 2500);
      });
    }

    // ===== PARTICLES =====
    function createParticles() {
      const container = document.getElementById('particles');
      const count = window.innerWidth < 768 ? 15 : 30;

      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (1 + Math.random() * 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
      }
    }

    createParticles();

    // ===== SMOOTH REVEAL ON SCROLL =====
    const cards = document.querySelectorAll('.card, .oath-scroll, .toc-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(card);
    });

    // Hide loading after timeout if Firebase doesn't respond
    setTimeout(hideLoading, 5000);

    // ===== THEME TOGGLE =====
    function toggleTheme() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = (current === 'gold') ? 'purple' : 'gold';
      html.setAttribute('data-theme', next);
      localStorage.setItem('lb_theme', next);
      document.getElementById('themeToggle').textContent = (next === 'gold') ? '💜' : '✨';
    }

    // Apply saved theme on load
    (function() {
      var saved = localStorage.getItem('lb_theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        var btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = (saved === 'gold') ? '💜' : '✨';
      }
    })();

    // ===== BASIC PAGE PROTECTION =====
    // Block right-click
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

    // Block keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // F12
      if (e.key === 'F12') { e.preventDefault(); return; }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return; }
      // Ctrl+S (save)
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); return; }
      // Ctrl+Shift+I (devtools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return; }
      // Ctrl+Shift+J (console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return; }
      // Ctrl+Shift+C (inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); return; }
    });
  