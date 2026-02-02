clear all, close all, clc;

% Progetto esame
%
% Controlli Automatici T
%
%
% PARAMETRI FISICI DEL SISTEMA
% 
% massa                                 = 0.04
% raggio interno puleggia               = 0.0045 m
% raggio esterno puleggia               = 0.045 m
% momento di inerzia                    = 0.962 kg m^2
% costante di gravitazione universale   = 9.81 m/s^2
%
%
% EQUILIBRIO
% 
% posizione di equilibrio = pi/3 rad
%
% SPECIFICHE
% 
%   - errore a regime in risposta a un gradino w(t) = 1(t) e d(t) = 1(t) pari a 0.01
%
%   - attenuazione di almeno 50dB per d(t) con [omega_d_min,omega_d_max] = [0,0.05]
%
%   - attenuazione di almeno 100dB per n(t) con [omega_n_min,omega_n_max] = [10^4,10^6]
%
%   - S% <= 7%
%   
%   - Ta,5 <= 0.1 s
%
%   - M_f >= 40 gradi

%solo per visualizzione, pulsazione minima e massima
omega_plot_min = 1e-4;
omega_plot_max = 1e9;


%% Parametri fisici

m = 0.04;
beta = 0.08;
r_2 = 0.045;
r_1 = 0.0045;
l = 1;
J = 0.962;
K_max = 4000;
k = 6.2;
T_avg = 70;
T_diff = 20;
gg = 9.81;

% relazione tra ingresso u e stato x
% u = T_diff/k * log(1/(1 - (m*gg*r_2)/(K_max * r_1 * (l - r_1 * x_1))) - 1) + T_avg;

%% Calcolo coppia di equilibrio

x_1e = pi/3;
x_2e = 0;

u_e = T_diff/k * log(1/(1 - (m*gg*r_2)/(K_max * r_1 * (l - r_1 * x_1e))) - 1) + T_avg;

%% Linearizzazione e Funzione di Trasferimento
%syms x y T K_max J r_1 T_diff T_avg k beta m gg r_2;
%jacobian([y,(K_max*(1-1/(1+exp(k*(T-T_avg)/T_diff)))*(l-r_1*x)*r_1 - (m*gg + beta * r_2 * y) *r_2)/J],[ x,y])
%jacobian([y,(K_max*(1-1/(1+exp(k*(T-T_avg)/T_diff)))*(l-r_1*x)*r_1 - (m*gg + beta * r_2 * y) *r_2)/J],T)

A = [0  1;(K_max*r_1^2*(1/(exp((k*(u_e - T_avg))/T_diff) + 1) - 1))/J,  -(beta*r_2^2)/J];

%A =
%[          0,        1.0]
%[-0.00011315, -0.0001684]

B = [0 ; (K_max*k*r_1*exp((k*(u_e - T_avg))/T_diff)*(l - r_1*x_1e))/(J*T_diff*(exp((k*(u_e - T_avg))/T_diff) + 1)^2)];

%B
%         0
% 0.0056826

C = [1 0];

D = 0;

s = tf('s');

% funzione di trasferimento
GG = C* inv(s*eye(2)-A)* B + D;

%% Specifiche

% ampiezze gradini
WW = 1;
DD = 1;

% errore a regime
e_star = 0.01;

% attenuazione disturbo in uscita
A_d = 50;
% avrei 0 come pulsazione, ma essendo un diagramma logaritmico il log(0)
% non esiste. Considero quindi una pusazione molto piccola, di modo che
% occupi tutta l'area di visibilità del Bode della G

omega_d_min = 1e-5;
omega_d_max = 0.05;

% atteuazione disturbo di misura
A_n = 100;
omega_n_min = 1e5;
omega_n_max = 1e7;

% Sovraelongazione massima e tempo d'assestamento al 5%
S_star = 7;
T_star = 0.1;

% Margine di fase
Mf_esp = 40;


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Progettazione regolatore statico
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

mu_s_error = (WW + DD)/e_star/abs(evalfr(GG,j*0))

G_omega_d_max = abs(evalfr(GG,j*omega_d_max));

mu_s_d = 10^(A_d/20)/G_omega_d_max

RR_s = max(mu_s_error,mu_s_d) * 1/s;


% Sistema esteso
GG_e = RR_s*GG


%% Diagramma di Bode di G con specifiche

figure(1);
hold on;

% calcolo specifiche S% -> margine di fase
xi_star = abs(log(S_star/100))/sqrt(pi^2 + log(S_star/100)^2);

Mf = max(xi_star*100,Mf_esp);

% specifiche su d
Bnd_d_x = [omega_d_min; omega_d_max; omega_d_max; omega_d_min];
Bnd_d_y = [A_d; A_d; -150; -150];

patch(Bnd_d_x, Bnd_d_y,'r','FaceAlpha',0.2,'EdgeAlpha',0);

% specifiche su n
Bnd_n_x = [omega_n_min; omega_n_max; omega_n_max; omega_n_min];
Bnd_n_y = [-A_n; -A_n; 100; 100];

patch(Bnd_n_x, Bnd_n_y,'y','FaceAlpha',0.2,'EdgeAlpha',0);

% specifiche tempo di assestamento
omega_Ta_min = 1e-6;
omega_Ta_max = 300/(Mf * T_star);

Bnd_Ta_x = [omega_Ta_min; omega_Ta_max; omega_Ta_max; omega_Ta_min];
Bnd_Ta_y = [0; 0; -150; -150];

patch(Bnd_Ta_x, Bnd_Ta_y,'b','FaceAlpha',0.2,'EdgeAlpha',0);

% Legenda colori
Legend_mag = ["A_d"; "A_n"; "\omega_{c,min}"; "G(j\omega)"];
legend(Legend_mag);

% Plot Bode con margini di stabilità
margin(GG, {omega_plot_min,omega_plot_max});
grid on; zoom on;

% Specifiche sovraelongazione (margine di fase)
omega_c_min = omega_Ta_max;
omega_c_max = omega_n_min;

phi_up = Mf - 180;
phi_low = -360; % lower bound per il plot

Bnd_Mf_x = [omega_c_min; omega_c_max; omega_c_max; omega_c_min];
Bnd_Mf_y = [phi_up; phi_up; phi_low; phi_low];
patch(Bnd_Mf_x, Bnd_Mf_y,'g','FaceAlpha',0.2,'EdgeAlpha',0);

% Legenda colori
Legend_arg = ["G(j\omega)"; "M_f"];
legend(Legend_arg);


%% Diagrammi di Bode di Ge con specifiche
figure(2);
hold on;

patch(Bnd_d_x, Bnd_d_y,'r','FaceAlpha',0.2,'EdgeAlpha',0);

patch(Bnd_n_x, Bnd_n_y,'y','FaceAlpha',0.2,'EdgeAlpha',0);

patch(Bnd_Ta_x, Bnd_Ta_y,'b','FaceAlpha',0.2,'EdgeAlpha',0);

% Legenda colori
Legend_mag = ["A_d"; "A_n"; "\omega_{c,min}"; "G(j\omega)"];
legend(Legend_mag);

% Plot Bode con margini di stabilità
margin(GG_e, {omega_plot_min,omega_plot_max});
grid on; zoom on;

% Specifiche sovraelongazione (margine di fase)
patch(Bnd_Mf_x, Bnd_Mf_y,'g','FaceAlpha',0.2,'EdgeAlpha',0);

% Legenda colori
Legend_arg = ["G(j\omega)"; "M_f"];
legend(Legend_arg);


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Design regolatore dinamico
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% prendiamo margine + 5 per essere conservativi
Mf_star = Mf + 5;
omega_c_star = 200;

% modulo della G estesa in omega_c_star
mag_omega_c_star_dB = abs(evalfr(GG_e,j*omega_c_star));

% fase della G estesa in omega_c_star
arg_omega_c_star = rad2deg(angle(evalfr(GG_e,j*omega_c_star)));

M_star = 1/mag_omega_c_star_dB;
phi_star = Mf_star - 180 - arg_omega_c_star;

tau = (M_star - cos(phi_star*pi/180))/(omega_c_star*sin(phi_star*pi/180));
alpha_tau = (cos(phi_star*pi/180) - 1/M_star)/(omega_c_star*sin(phi_star*pi/180));
alpha = alpha_tau / tau;

if min(tau,alpha) < 0
    fprintf('Errore: parametri rete anticipatrice negativi');
    return;
end

% polo ad alta frequenza
R_high_frequency = 1/(1 + s/4e3);

RR_d = (1 + tau*s)/(1 + alpha * tau*s)*R_high_frequency;

RR = RR_s*RR_d;

% funzione di anello
LL = RR_d*GG_e; 

figure(3);
hold on;

% Specifiche su ampiezza
patch(Bnd_d_x, Bnd_d_y,'r','FaceAlpha',0.2,'EdgeAlpha',0);
patch(Bnd_n_x, Bnd_n_y,'y','FaceAlpha',0.2,'EdgeAlpha',0);
patch(Bnd_Ta_x, Bnd_Ta_y,'b','FaceAlpha',0.2,'EdgeAlpha',0);
legend(Legend_mag);

% Plot Bode con margini di stabilità
margin(LL,{omega_plot_min,omega_plot_max});
grid on; zoom on;

% Specifiche su fase
patch(Bnd_Mf_x, Bnd_Mf_y,'g','FaceAlpha',0.2,'EdgeAlpha',0);
legend(Legend_arg);

% STOP qui per sistema con controllore dinamico + specifiche
if 0
    return;
end


%% Check prestazioni in anello chiuso

% Funzione di sensitività complementare
FF = LL/(1+LL);

% Risposta al gradino
figure(4);

T_simulation = 2*T_star;
[y_step,t_step] = step(WW*FF, T_simulation);
plot(t_step,y_step,'b');
grid on, zoom on, hold on;

LV = evalfr(WW*FF,0);

% vincolo sovraelongazione
patch([0,T_simulation,T_simulation,0],[LV*(1+S_star/100),LV*(1+S_star/100),LV*2,LV*2],'r','FaceAlpha',0.3,'EdgeAlpha',0.5);

% vincolo tempo di assestamento all'1%
patch([T_star,T_simulation,T_simulation,T_star],[LV*(1-0.05),LV*(1-0.05),0,0],'g','FaceAlpha',0.1,'EdgeAlpha',0.5);
patch([T_star,T_simulation,T_simulation,T_star],[LV*(1+0.05),LV*(1+0.05),LV*2,LV*2],'g','FaceAlpha',0.1,'EdgeAlpha',0.1);

ylim([0,LV*2]);

Legend_step = ["Risposta al gradino"; "Vincolo sovraelongazione"; "Vincolo tempo di assestamento"];
legend(Legend_step);


%% Check disturbo in uscita

% Funzione di sensitività
SS = 1/(1+LL);
figure(5);

% Simulazione disturbo in uscita
tt = 0:1e-2:7e2;
dd = DD* (sin(0.01*1*tt) + sin(0.01 * 2 * tt) + sin(0.01 * 3 * tt));
y_d = lsim(SS,dd,tt);
hold on, grid on, zoom on
plot(tt,dd,'m')
plot(tt,y_d,'b')
grid on
legend('d(t)','y_d(t)')


%% Check disturbo di misura

% Funzione di sensitività complementare
FF = LL/(1+LL);
figure(6);

% Simulazione disturbo di misura
NN = 1;
tt = 0:1e-5:2*1e-3;
nn = NN* (sin(1e5*1*tt) + sin(1e5 * 2 * tt) + sin(1e5 * 3 * tt));
y_n = lsim(FF,nn,tt);
hold on, grid on, zoom on
plot(tt,nn,'m')
plot(tt,y_n,'b')
grid on
legend('n(t)','y_n(t')


