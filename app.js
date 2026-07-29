(() => {
  'use strict';

  const STORAGE_KEY = 'algebra-unidad3-sel-progress-v1';
  const MODULE_KEYS = ['ecuaciones','grafica','matricial','gauss','gauss-jordan','compatibilidad','homogeneos','parametros','aplicaciones','practica','autoevaluacion'];
  const completed = new Set(loadProgress());

  const steppers = {
    generalSolution: {
      tag: 'Ejemplo guiado',
      title: 'Solución general de una ecuación con tres incógnitas',
      intro: String.raw`Determinar el conjunto solución de \(3x-4y+z=6\).`,
      steps: [
        String.raw`<strong>Paso 1. Contar incógnitas.</strong><p>Hay tres incógnitas y una sola ecuación. Al despejar una de ellas quedarán dos variables libres.</p>`,
        String.raw`<strong>Paso 2. Elegir una incógnita.</strong><p>Despejamos \(z\): \[z=6-3x+4y.\]</p>`,
        String.raw`<strong>Paso 3. Escribir la terna.</strong><p>Toda solución tiene la forma \[(x,y,6-3x+4y).\]</p>`,
        String.raw`<strong>Paso 4. Escribir el conjunto solución.</strong><p>\[S=\{(x,y,6-3x+4y):x,y\in\mathbb R\}.\]</p><p>Por ejemplo, tomando \(x=0,y=0\) se obtiene \((0,0,6)\).</p>`
      ]
    },
    gaussTP: {
      tag: 'Resolución paso a paso',
      title: 'Gauss en el ejercicio 3.i del TP',
      intro: String.raw`Resolver y clasificar el sistema de cuatro ecuaciones con tres incógnitas.`,
      steps: [
        String.raw`<strong>Paso 1. Construir la matriz ampliada.</strong>\[\left[\begin{array}{ccc|c}2&3&-1&4\\1&-2&1&-7\\-3&2&2&14\\3&1&0&-3\end{array}\right].\]`,
        String.raw`<strong>Paso 2. Elegir un pivote cómodo.</strong><p>Intercambiamos \(F_1\leftrightarrow F_2\) para comenzar con un uno.</p>\[\left[\begin{array}{ccc|c}1&-2&1&-7\\2&3&-1&4\\-3&2&2&14\\3&1&0&-3\end{array}\right].\]`,
        String.raw`<strong>Paso 3. Anular debajo del primer pivote.</strong><p>Usamos \(F_2\leftarrow F_2-2F_1\), \(F_3\leftarrow F_3+3F_1\) y \(F_4\leftarrow F_4-3F_1\).</p>\[\left[\begin{array}{ccc|c}1&-2&1&-7\\0&7&-3&18\\0&-4&5&-7\\0&7&-3&18\end{array}\right].\]`,
        String.raw`<strong>Paso 4. Continuar el escalonamiento.</strong><p>La cuarta fila coincide con la segunda y se transforma en una fila nula. La tercera produce el pivote de \(z\).</p>\[\left[\begin{array}{ccc|c}1&-2&1&-7\\0&1&-\frac37&\frac{18}{7}\\0&0&1&1\\0&0&0&0\end{array}\right].\]`,
        String.raw`<strong>Paso 5. Sustitución hacia atrás.</strong><p>De la tercera fila, \(z=1\). Luego \(y-\frac37=\frac{18}{7}\), por lo que \(y=3\). Finalmente, \(x-6+1=-7\), entonces \(x=-2\).</p>`,
        String.raw`<strong>Conclusión.</strong><p>\(\operatorname{Rg}(A)=\operatorname{Rg}(A')=3=n\). El sistema es compatible determinado:</p>\[S=\{(-2,3,1)\}.\]`
      ]
    },
    gaussJordan: {
      tag: 'Comparación de métodos',
      title: 'De la forma escalonada a la reducida',
      intro: String.raw`Resolver \(\{2x-y-z=0,\;-x+y=2,\;4x-2y+z=0\}\).`,
      steps: [
        String.raw`<strong>Paso 1. Matriz ampliada.</strong>\[\left[\begin{array}{ccc|c}2&-1&-1&0\\-1&1&0&2\\4&-2&1&0\end{array}\right].\]`,
        String.raw`<strong>Paso 2. Gauss.</strong><p>Después de intercambiar filas y anular entradas debajo de los pivotes:</p>\[\left[\begin{array}{ccc|c}1&-1&0&-2\\0&1&-1&4\\0&0&1&0\end{array}\right].\]`,
        String.raw`<strong>Paso 3. Continuar con Gauss-Jordan.</strong><p>Usamos el pivote de \(z\) para anular arriba y luego el pivote de \(y\):</p>\[\left[\begin{array}{ccc|c}1&0&0&2\\0&1&0&4\\0&0&1&0\end{array}\right].\]`,
        String.raw`<strong>Lectura directa.</strong><p>\(x=2\), \(y=4\), \(z=0\). Por lo tanto:</p>\[S=\{(2,4,0)\}.\]`
      ]
    },
    inverseMethod: {
      tag: 'Método de la inversa',
      title: 'Resolver un sistema mediante \(X=A^{-1}B\)',
      intro: String.raw`Para el sistema del material teórico con \(A=\begin{pmatrix}3&2&1\\1&0&1\\0&1&2\end{pmatrix}\).`,
      steps: [
        String.raw`<strong>Paso 1. Verificar condiciones.</strong><p>Hay tres ecuaciones y tres incógnitas, por lo que \(A\) es cuadrada. Además, \(\det(A)=-6\ne0\).</p>`,
        String.raw`<strong>Paso 2. Concluir inversibilidad.</strong><p>Como el determinante no es cero, existe \(A^{-1}\) y el sistema es compatible determinado.</p>`,
        String.raw`<strong>Paso 3. Multiplicar en el orden correcto.</strong><p>De \(AX=B\), multiplicamos por \(A^{-1}\) a la izquierda:</p>\[X=A^{-1}B.\]`,
        String.raw`<strong>Paso 4. Resultado.</strong><p>La multiplicación produce:</p>\[X=\begin{pmatrix}-\frac16\\\frac23\\\frac16\end{pmatrix},\qquad S=\left\{\left(-\frac16,\frac23,\frac16\right)\right\}.\]`
      ]
    },
    parameterAnalysis: {
      tag: 'Análisis guiado',
      title: 'Separar los valores regulares de los especiales',
      intro: String.raw`Analizar la fila \([0\;0\;k^2-9\mid k+3]\).`,
      steps: [
        String.raw`<strong>Paso 1. Buscar cuándo se pierde el pivote.</strong><p>\(k^2-9=0\) si y solo si \(k=-3\) o \(k=3\).</p>`,
        String.raw`<strong>Paso 2. Caso regular.</strong><p>Si \(k\notin\{-3,3\}\), el coeficiente de \(z\) es distinto de cero. Hay tres pivotes: el sistema es C.D.</p>`,
        String.raw`<strong>Paso 3. Caso \(k=-3\).</strong><p>La última fila queda \([0\;0\;0\mid0]\). Los rangos coinciden y son menores que \(n=3\): el sistema es C.I.</p>`,
        String.raw`<strong>Paso 4. Caso \(k=3\).</strong><p>La última fila queda \([0\;0\;0\mid6]\), que representa \(0=6\). El sistema es incompatible.</p>`,
        String.raw`<strong>Conclusión.</strong><p>\[\text{C.D.}:\mathbb R\setminus\{-3,3\},\qquad \text{C.I.}:\{-3\},\qquad \text{I.}:\{3\}.\]</p>`
      ]
    },
    refineryBlend: {
      tag: 'Aplicación guiada',
      title: 'Mezcla de crudos en una refinería',
      intro: 'Se desean 1000 barriles de gasolina y 800 de diésel usando crudos A y B.',
      steps: [
        String.raw`<strong>Paso 1. Definir incógnitas.</strong><p>Sea \(x\) la cantidad de crudo A y \(y\) la cantidad de crudo B.</p>`,
        String.raw`<strong>Paso 2. Modelizar.</strong><p>Para gasolina: \(0.7x+0.5y=1000\). Para diésel: \(0.3x+0.5y=800\).</p>`,
        String.raw`<strong>Paso 3. Restar ecuaciones.</strong><p>\((0.7-0.3)x=200\), de modo que \(0.4x=200\) y \(x=500\).</p>`,
        String.raw`<strong>Paso 4. Hallar la segunda cantidad.</strong><p>\(0.3(500)+0.5y=800\), entonces \(y=1300\).</p>`,
        String.raw`<strong>Respuesta.</strong><p>Se necesitan \(500\) barriles de crudo A y \(1300\) barriles de crudo B.</p>`
      ]
    },
    pipelinePressure: {
      tag: 'Aplicación guiada',
      title: 'Presiones en tres tuberías',
      intro: 'Traducir las relaciones entre presiones y resolver el sistema.',
      steps: [
        String.raw`<strong>Paso 1. Nombrar incógnitas.</strong><p>Sean \(p_1,p_2,p_3\) las presiones en psi.</p>`,
        String.raw`<strong>Paso 2. Escribir el sistema.</strong>\[\begin{cases}2p_1-p_2=100\\-p_1+3p_2-p_3=50\\-p_2+2p_3=80\end{cases}\]`,
        String.raw`<strong>Paso 3. Resolver.</strong><p>Aplicando eliminación se obtiene \(p_2=70\). Luego \(2p_1=170\) y \(2p_3=150\).</p>`,
        String.raw`<strong>Respuesta.</strong><p>\[p_1=85\text{ psi},\qquad p_2=70\text{ psi},\qquad p_3=75\text{ psi}.\]</p>`
      ]
    },
    tpSetVerification: {
      tag: 'TP 3 · ejercicio 5',
      title: 'Verificar un conjunto solución',
      intro: String.raw`Decidir si \(S=\{(-3z,-2,z):z\in\mathbb R\}\) resuelve el sistema dado.`,
      steps: [
        String.raw`<strong>Paso 1. Identificar las coordenadas.</strong><p>En cada terna: \(x=-3z\), \(y=-2\) y la tercera coordenada es \(z\).</p>`,
        String.raw`<strong>Paso 2. Verificar la primera ecuación.</strong><p>\((-3z)-(-2)+3z=2\). Se reduce a \(2=2\).</p>`,
        String.raw`<strong>Paso 3. Verificar las restantes.</strong><p>\((-3z)-3(-2)+3z=6\) y \(-(-3z)+5(-2)-3z=-10\). Ambas son identidades.</p>`,
        String.raw`<strong>Conclusión.</strong><p>Todas las ternas del conjunto satisfacen simultáneamente el sistema. El conjunto propuesto sí es el conjunto solución.</p>`
      ]
    }
  };

  const graphCases = [
    {
      label: 'Caso 1', answer: 'CD',
      equations: String.raw`\(x+y=3\) y \(-3x+y=1\)`,
      lines: [{m:-1,b:3,label:'L₁'},{m:3,b:1,label:'L₂'}],
      point: [.5,2.5],
      explanation: String.raw`Las rectas se cortan en un único punto: \(\left(\frac12,\frac52\right)\).`
    },
    {
      label: 'Caso 2', answer: 'CI',
      equations: String.raw`\(-x+y=4\) y \(2x-2y=-8\)`,
      lines: [{m:1,b:4,label:'L₁'},{m:1,b:4,label:'L₂',dash:true}],
      explanation: String.raw`Las ecuaciones son equivalentes y representan la misma recta. Todos sus puntos son soluciones.`
    },
    {
      label: 'Caso 3', answer: 'I',
      equations: String.raw`\(-x-y=5\) y \(-3x-3y=-9\)`,
      lines: [{m:-1,b:-5,label:'L₁'},{m:-1,b:3,label:'L₂'}],
      explanation: String.raw`Las rectas son paralelas y distintas, por lo que no tienen puntos en común.`
    }
  ];
  let graphIndex = 0;

  const echelonCases = [
    {latex:String.raw`\begin{pmatrix}1&4&0\\0&2&1\\0&0&1\end{pmatrix}`, answer:'Ninguna', explanation:'El primer elemento no nulo de la segunda fila no es 1.'},
    {latex:String.raw`\begin{pmatrix}1&4&0\\0&1&1\\0&0&1\end{pmatrix}`, answer:'Escalonada', explanation:'Tiene pivotes 1 y ceros debajo, pero no hay ceros arriba de todos los pivotes.'},
    {latex:String.raw`\begin{pmatrix}1&0&-1&3\\0&1&0&2\\0&0&0&0\end{pmatrix}`, answer:'Reducida', explanation:'Cada pivote es 1 y es el único elemento no nulo de su columna.'},
    {latex:String.raw`\begin{pmatrix}0&1&2\\0&0&0\\0&0&1\end{pmatrix}`, answer:'Ninguna', explanation:'La fila nula no está al final.'}
  ];
  let echelonIndex = 0;

  const reducedCases = [
    {
      latex:String.raw`\left[\begin{array}{ccc|c}1&0&0&0\\0&1&0&0\\0&0&0&1\end{array}\right]`,
      options:['C.D.','C.I.','Incompatible'], answer:2,
      explanation:String.raw`La última fila representa \(0=1\). Por lo tanto, \(S=\varnothing\).`
    },
    {
      latex:String.raw`\left[\begin{array}{ccc|c}1&0&-2&5\\0&1&3&-1\\0&0&0&0\end{array}\right]`,
      options:['C.D.','C.I.','Incompatible'], answer:1,
      explanation:String.raw`Hay dos pivotes y tres incógnitas. \(S=\{(5+2t,-1-3t,t):t\in\mathbb R\}.\)`
    },
    {
      latex:String.raw`\left[\begin{array}{ccc|c}1&0&0&-8\\0&1&0&0\\0&0&1&7\end{array}\right]`,
      options:['C.D.','C.I.','Incompatible'], answer:0,
      explanation:String.raw`Se leen tres valores únicos: \(S=\{(-8,0,7)\}.\)`
    },
    {
      latex:String.raw`\left[\begin{array}{cccc|c}1&0&0&0&0\\0&1&0&2&2\\0&0&1&0&0\end{array}\right]`,
      options:['C.D.','C.I.','Incompatible'], answer:1,
      explanation:String.raw`Hay tres pivotes y cuatro incógnitas. \(x_4\) es libre y \(S=\{(0,2-2t,0,t):t\in\mathbb R\}.\)`
    }
  ];
  let reducedIndex = 0;

  const rankCases = [
    {n:3, ra:3, rau:3, answer:'CD', explanation:'Los rangos coinciden y son iguales al número de incógnitas.'},
    {n:4, ra:2, rau:2, answer:'CI', explanation:'Los rangos coinciden, pero son menores que el número de incógnitas.'},
    {n:3, ra:2, rau:3, answer:'I', explanation:'Los rangos son distintos; aparece una contradicción.'},
    {n:5, ra:4, rau:4, answer:'CI', explanation:'Hay una variable libre porque el rango común es 4 y n=5.'},
    {n:2, ra:2, rau:2, answer:'CD', explanation:'Hay un pivote por cada incógnita.'}
  ];
  let rankIndex = 0;

  const inverseCases = [
    {text:String.raw`\(A\) es \(3\times3\) y \(\det(A)=5\).`, answer:0, options:['Aplicar \(X=A^{-1}B\)','Usar Gauss porque la inversa no existe','No hay información suficiente'], explanation:'A es cuadrada y su determinante no es cero.'},
    {text:String.raw`\(A\) es \(3\times3\) y \(\det(A)=0\).`, answer:1, options:['Aplicar \(X=A^{-1}B\)','Usar Gauss para decidir C.I. o incompatibilidad','Concluir automáticamente que es incompatible'], explanation:'No existe A⁻¹; el determinante cero no distingue C.I. de incompatible en un sistema no homogéneo.'},
    {text:String.raw`El sistema tiene 2 ecuaciones y 3 incógnitas.`, answer:1, options:['Aplicar matriz inversa','Usar Gauss; la matriz de coeficientes no es cuadrada','Concluir que es C.D.'], explanation:'La matriz de coeficientes es 2×3 y no tiene inversa.'},
    {text:String.raw`\(AX=O\), \(A\) es cuadrada y \(\det(A)\ne0\).`, answer:0, options:['La única solución es la trivial','El sistema es incompatible','Tiene infinitas soluciones'], explanation:'Un homogéneo con A inversible es C.D. y su única solución es X=O.'}
  ];
  let inverseIndex = 0;

  const errorCases = [
    {statement:'“Un sistema homogéneo puede ser incompatible si tiene muchas ecuaciones.”', options:['Correcto','Incorrecto: la solución trivial siempre existe','Solo es falso si A es cuadrada'], answer:1, explanation:'Todo sistema homogéneo admite al menos la solución trivial.'},
    {statement:'“Si \(\operatorname{Rg}(A)=\operatorname{Rg}(A\')<n\), el sistema es compatible determinado.”', options:['Correcto','Debe ser compatible indeterminado','Debe ser incompatible'], answer:1, explanation:'Al ser el rango menor que n quedan variables libres.'},
    {statement:'“Para resolver por Gauss conviene borrar inmediatamente las filas nulas.”', options:['Correcto','No: en la matriz ampliada se conserva el tamaño y la fila informa sobre el rango','Solo se borran si el sistema es homogéneo'], answer:1, explanation:'En el registro matricial del método se conserva la fila nula hasta el final.'},
    {statement:'“Como una matriz de coeficientes es cuadrada, siempre puede usarse el método de la inversa.”', options:['Correcto','Falta verificar que el determinante sea distinto de cero','Solo depende de B'], answer:1, explanation:'Ser cuadrada es necesario, pero también debe ser inversible.'},
    {statement:'“La fila \([0\;0\;0\mid5]\) representa una ecuación redundante.”', options:['Correcto','Representa una contradicción \(0=5\)','Representa una variable libre'], answer:1, explanation:'Una fila así hace que el sistema sea incompatible.'},
    {statement:'“En \(x_1+x_2+x_3=1\), si \(x_2,x_3\) son libres entonces \(x_2=1-x_2-x_3\).”', options:['Correcto','El miembro izquierdo debe ser \(x_1\)','La variable libre debe ser x₁'], answer:1, explanation:'La variable dependiente es x₁: x₁=1-x₂-x₃.'}
  ];
  let errorIndex = 0;

  const quizBank = [
    {q:'Una solución de una ecuación lineal con tres incógnitas es:', options:['Un número','Una dupla','Una terna'], a:2, e:'Se necesita un valor ordenado para cada incógnita.'},
    {q:String.raw`La ecuación \(2x-4y=-6\) tiene:`, options:['Una sola solución','Infinitas soluciones','Ninguna solución'], a:1, e:'Su conjunto solución es una recta.'},
    {q:'Un sistema compatible determinado tiene:', options:['Una solución','Infinitas soluciones','Ninguna solución'], a:0, e:'Determinado significa solución única.'},
    {q:'Dos rectas paralelas y distintas representan un sistema:', options:['C.D.','C.I.','Incompatible'], a:2, e:'No tienen puntos en común.'},
    {q:'Dos ecuaciones equivalentes en dos incógnitas representan:', options:['Rectas coincidentes','Rectas perpendiculares','Rectas paralelas distintas'], a:0, e:'Tienen exactamente el mismo conjunto de puntos.'},
    {q:String.raw`En \(AX=B\), si A es \(m\times n\), X debe tener orden:`, options:['m×1','n×1','n×m'], a:1, e:'Las dimensiones internas deben coincidir.'},
    {q:'La matriz ampliada contiene:', options:['Solo coeficientes','Coeficientes y términos independientes','Solo incógnitas'], a:1, e:'Se escribe [A|B].'},
    {q:'Gauss busca una matriz:', options:['Diagonal','Escalonada','Simétrica'], a:1, e:'Luego se usa sustitución hacia atrás.'},
    {q:'Gauss-Jordan busca una matriz:', options:['Escalonada reducida','Triangular no escalonada','Nula'], a:0, e:'Anula también las entradas por encima de los pivotes.'},
    {q:String.raw`La fila \([0\;0\;0\mid3]\) indica:`, options:['Una identidad','Una contradicción','Una variable libre'], a:1, e:'Representa 0=3.'},
    {q:String.raw`Si \(\operatorname{Rg}(A)=\operatorname{Rg}(A')=n\):`, options:['C.D.','C.I.','Incompatible'], a:0, e:'Hay un pivote por incógnita.'},
    {q:String.raw`Si \(\operatorname{Rg}(A)=\operatorname{Rg}(A')<n\):`, options:['C.D.','C.I.','Incompatible'], a:1, e:'Quedan variables libres.'},
    {q:String.raw`Si \(\operatorname{Rg}(A)<\operatorname{Rg}(A')\):`, options:['C.D.','C.I.','Incompatible'], a:2, e:'Los rangos distintos impiden la compatibilidad.'},
    {q:'Todo sistema homogéneo:', options:['Es compatible','Es incompatible','Tiene solución única'], a:0, e:'Siempre contiene la solución trivial.'},
    {q:'Un sistema homogéneo C.D. tiene como única solución:', options:['Una familia paramétrica','La solución trivial','El conjunto vacío'], a:1, e:'X=O.'},
    {q:String.raw`El método \(X=A^{-1}B\) requiere:`, options:['A rectangular','A cuadrada e inversible','B inversible'], a:1, e:'A debe admitir inversa.'},
    {q:String.raw`Si \(\det(A)=0\) en un sistema no homogéneo cuadrado:`, options:['Siempre es incompatible','Puede ser C.I. o incompatible','Siempre es C.I.'], a:1, e:'Hay que usar Gauss para decidir.'},
    {q:String.raw`Para \([0\;0\;k^2-9\mid k+3]\), con \(k=-3\):`, options:['La fila es nula','Aparece 0=6','Hay un pivote'], a:0, e:'Ambos valores son cero.'},
    {q:String.raw`Para la misma fila, con \(k=3\):`, options:['La fila es nula','Aparece 0=6','Hay un pivote'], a:1, e:'k²−9=0 y k+3=6.'},
    {q:'El problema de mezclar tres combustibles con solo volumen total y octanaje total tiene:', options:['Una solución única','Una familia de soluciones','Ninguna solución necesariamente'], a:1, e:'Hay tres incógnitas y solo dos condiciones independientes.'},
    {q:'En el punto de equilibrio del anexo, la producción es:', options:['300 barriles','500 barriles','1000 barriles'], a:1, e:'50q−10000=20q+5000 da q=500.'},
    {q:String.raw`Si una matriz reducida tiene 2 pivotes y el sistema tiene 4 incógnitas, quedan:`, options:['0 variables libres','2 variables libres','4 variables libres'], a:1, e:'Variables libres = n−rango = 4−2.'}
  ];
  let currentQuiz = [];

  const resolutionPlanSteps = [
    'Ordenar las ecuaciones y las incógnitas de manera consistente.',
    'Construir la matriz ampliada, incluyendo los coeficientes cero.',
    'Aplicar operaciones elementales para escalonar.',
    'Leer rangos y clasificar el sistema.',
    'Hallar el conjunto solución y verificar cuando sea conveniente.'
  ];
  let currentPlan = [];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavigation();
    setupProgress();
    renderSteppers();
    setupLinearEquationLab();
    setupTupleChecker();
    setupGraphLab();
    setupCommonPoint();
    setupMatrixBuilder();
    setupEchelonClassifier();
    setupRowOperationChallenge();
    setupReducedMatrixLab();
    setupRankLab();
    setupAbsurdRow();
    setupHomogeneousLab();
    setupInverseDecision();
    setupParameterLab();
    setupBreakEven();
    setupOctaneLab();
    setupErrorDetective();
    setupResolutionPlan();
    setupVideos();
    setupQuiz();
    setupGlobalActions();
    updateProgressUI();
    typeset();
  }

  function setupNavigation() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    const menuButton = document.getElementById('menuButton');

    document.querySelectorAll('[data-target]').forEach(button => {
      button.addEventListener('click', () => showModule(button.dataset.target));
    });
    document.querySelectorAll('[data-go]').forEach(button => {
      button.addEventListener('click', () => showModule(button.dataset.go));
    });

    menuButton?.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      overlay.hidden = !open;
    });
    overlay?.addEventListener('click', closeSidebar);

    function closeSidebar() {
      sidebar.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      overlay.hidden = true;
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeSidebar();
    });
  }

  function showModule(id) {
    document.querySelectorAll('.module').forEach(section => {
      const active = section.id === id;
      section.hidden = !active;
      section.classList.toggle('active', active);
    });
    document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.target === id));
    document.getElementById('sidebar')?.classList.remove('open');
    const overlay = document.getElementById('mobileOverlay');
    if (overlay) overlay.hidden = true;
    document.getElementById('menuButton')?.setAttribute('aria-expanded', 'false');
    window.scrollTo({top:0, behavior:'smooth'});
    typeset();
  }

  function setupProgress() {
    document.querySelectorAll('[data-complete]').forEach(button => {
      const key = button.dataset.complete;
      setCompleteButtonState(button, completed.has(key));
      button.addEventListener('click', () => {
        if (completed.has(key)) completed.delete(key); else completed.add(key);
        saveProgress();
        setCompleteButtonState(button, completed.has(key));
        updateProgressUI();
      });
    });
  }

  function markComplete(key) {
    if (!MODULE_KEYS.includes(key)) return;
    completed.add(key);
    const button = document.querySelector(`[data-complete="${key}"]`);
    if (button) setCompleteButtonState(button, true);
    saveProgress();
    updateProgressUI();
  }

  function setCompleteButtonState(button, done) {
    button.classList.toggle('done', done);
    button.textContent = done ? '✓ Módulo revisado' : 'Marcar módulo como revisado';
  }

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed])); }
    catch { /* El sitio sigue funcionando cuando el almacenamiento está bloqueado. */ }
  }

  function updateProgressUI() {
    const count = MODULE_KEYS.filter(key => completed.has(key)).length;
    const percent = Math.round((count / MODULE_KEYS.length) * 100);
    document.getElementById('progressText').textContent = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('progressDetail').textContent = `${count} de ${MODULE_KEYS.length} módulos marcados como revisados.`;
  }

  function renderSteppers() {
    document.querySelectorAll('[data-stepper]').forEach(container => {
      const key = container.dataset.stepper;
      const data = steppers[key];
      if (!data) return;
      let index = 0;
      container.innerHTML = `
        <div class="activity-header"><div><p class="tag">${data.tag}</p><h3>${data.title}</h3></div><span class="status-pill step-status"></span></div>
        <p>${data.intro}</p>
        <div class="step-stage"></div>
        <div class="step-controls">
          <button class="button ghost step-prev" type="button">Anterior</button>
          <button class="button primary step-next" type="button">Mostrar primer paso</button>
          <button class="button ghost step-reset" type="button">Reiniciar</button>
        </div>`;
      const stage = container.querySelector('.step-stage');
      const status = container.querySelector('.step-status');
      const prev = container.querySelector('.step-prev');
      const next = container.querySelector('.step-next');
      const reset = container.querySelector('.step-reset');

      function render() {
        if (index === 0) {
          stage.innerHTML = '<div class="step-placeholder">Intentá comenzar la resolución en papel y luego habilitá el primer paso.</div>';
          status.textContent = `0 / ${data.steps.length}`;
          next.textContent = 'Mostrar primer paso';
        } else {
          stage.innerHTML = `<div class="step-content">${data.steps.slice(0,index).map((s,i)=>`<article><span class="step-number">${i+1}</span><div>${s}</div></article>`).join('')}</div>`;
          status.textContent = `${index} / ${data.steps.length}`;
          next.textContent = index === data.steps.length ? 'Resolución completa' : 'Mostrar siguiente paso';
        }
        prev.disabled = index === 0;
        next.disabled = index === data.steps.length;
        if (index === data.steps.length) markComplete(container.closest('.module')?.id || '');
        typeset(stage);
      }
      prev.addEventListener('click', () => { if (index>0) index--; render(); });
      next.addEventListener('click', () => { if (index<data.steps.length) index++; render(); });
      reset.addEventListener('click', () => { index=0; render(); });
      render();
    });
  }

  function setupLinearEquationLab() {
    const slider = document.getElementById('linearParam');
    const value = document.getElementById('linearParamValue');
    const output = document.getElementById('linearSolutionOutput');
    const feedback = document.getElementById('generatedSolutionFeedback');
    function update() {
      const x = Number(slider.value);
      const y = x/2 + 1.5;
      value.textContent = formatNumber(x);
      output.innerHTML = String.raw`Para \(t=${formatNumber(x)}\): \[(x,y)=\left(${formatNumber(x)},${formatNumber(y)}\right).\]`;
      feedback.textContent = '';
      feedback.className = 'feedback';
      typeset(output);
    }
    slider.addEventListener('input', update);
    document.getElementById('verifyGeneratedSolution').addEventListener('click', () => {
      const x = Number(slider.value); const y = x/2+1.5;
      const lhs = 2*x-4*y;
      feedback.className = 'feedback success';
      feedback.innerHTML = String.raw`\(2(${formatNumber(x)})-4(${formatNumber(y)})=${formatNumber(lhs)}=-6\). La dupla sí es solución.`;
      markComplete('ecuaciones'); typeset(feedback);
    });
    update();
  }

  function setupTupleChecker() {
    const feedback = document.getElementById('tupleFeedback');
    document.getElementById('checkTuple').addEventListener('click', () => {
      const x=Number(document.getElementById('tupleX').value);
      const y=Number(document.getElementById('tupleY').value);
      const z=Number(document.getElementById('tupleZ').value);
      const lhs=3*x-y+2*z;
      const ok=Math.abs(lhs-5)<1e-9;
      feedback.className=`feedback ${ok?'success':'danger'}`;
      feedback.innerHTML=String.raw`\(3(${formatNumber(x)})-${formatSignedInput(y)}+2(${formatNumber(z)})=${formatNumber(lhs)}\). ${ok?'La terna satisface la ecuación.':'No coincide con 5, por lo que no es solución.'}`;
      if(ok) markComplete('ecuaciones'); typeset(feedback);
    });
    document.getElementById('randomTuple').addEventListener('click', () => {
      const solution=Math.random()>.5;
      const x=randomInt(-3,4), z=randomInt(-3,4);
      const y=solution ? 3*x+2*z-5 : randomInt(-5,5);
      document.getElementById('tupleX').value=x;
      document.getElementById('tupleY').value=y;
      document.getElementById('tupleZ').value=z;
      feedback.textContent=''; feedback.className='feedback';
    });
  }

  function setupGraphLab() {
    const svg=document.getElementById('systemGraph');
    const eq=document.getElementById('graphEquations');
    const label=document.getElementById('graphCaseLabel');
    const feedback=document.getElementById('graphFeedback');
    function render() {
      const item=graphCases[graphIndex];
      label.textContent=item.label;
      eq.innerHTML=item.equations;
      feedback.textContent=''; feedback.className='feedback';
      document.querySelectorAll('input[name="graphClass"]').forEach(r=>r.checked=false);
      drawGraph(svg,item);
      typeset(eq);
    }
    document.getElementById('checkGraphClass').addEventListener('click',()=>{
      const selected=document.querySelector('input[name="graphClass"]:checked')?.value;
      if(!selected){ setFeedback(feedback,'warning','Elegí una clasificación antes de comprobar.'); return; }
      const item=graphCases[graphIndex]; const ok=selected===item.answer;
      feedback.className=`feedback ${ok?'success':'danger'}`;
      feedback.innerHTML=`${ok?'Correcto.':'Revisá la posición relativa.'} ${item.explanation}`;
      if(ok) markComplete('grafica'); typeset(feedback);
    });
    document.getElementById('nextGraphCase').addEventListener('click',()=>{graphIndex=(graphIndex+1)%graphCases.length; render();});
    render();
  }

  function drawGraph(svg,item) {
    const W=560,H=440,pad=42,xMin=-6,xMax=6,yMin=-8,yMax=8;
    const sx=x=>pad+(x-xMin)/(xMax-xMin)*(W-2*pad);
    const sy=y=>H-pad-(y-yMin)/(yMax-yMin)*(H-2*pad);
    const parts=[];
    parts.push(`<rect width="${W}" height="${H}" fill="#fbfcff"/>`);
    for(let x=xMin;x<=xMax;x++) parts.push(`<line x1="${sx(x)}" y1="${sy(yMin)}" x2="${sx(x)}" y2="${sy(yMax)}" stroke="#e5eaf3" stroke-width="1"/>`);
    for(let y=yMin;y<=yMax;y++) parts.push(`<line x1="${sx(xMin)}" y1="${sy(y)}" x2="${sx(xMax)}" y2="${sy(y)}" stroke="#e5eaf3" stroke-width="1"/>`);
    parts.push(`<line x1="${sx(xMin)}" y1="${sy(0)}" x2="${sx(xMax)}" y2="${sy(0)}" stroke="#27364f" stroke-width="2"/>`);
    parts.push(`<line x1="${sx(0)}" y1="${sy(yMin)}" x2="${sx(0)}" y2="${sy(yMax)}" stroke="#27364f" stroke-width="2"/>`);
    const colors=['#2f6fed','#c23b55','#168a7a','#7e57c2'];
    item.lines.forEach((line,i)=>{
      const x1=xMin,x2=xMax,y1=line.m*x1+line.b,y2=line.m*x2+line.b;
      parts.push(`<line x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}" stroke="${colors[i]}" stroke-width="4" ${line.dash?'stroke-dasharray="10 7" opacity=".7"':''}/>`);
      const lx=4.3,ly=line.m*lx+line.b;
      if(ly>yMin&&ly<yMax) parts.push(`<text x="${sx(lx)+6}" y="${sy(ly)-8}" fill="${colors[i]}" font-size="18" font-weight="700">${line.label}</text>`);
    });
    if(item.point){
      parts.push(`<circle cx="${sx(item.point[0])}" cy="${sy(item.point[1])}" r="7" fill="#17233b"/>`);
      parts.push(`<text x="${sx(item.point[0])+10}" y="${sy(item.point[1])-10}" fill="#17233b" font-size="16">(${formatNumber(item.point[0])}, ${formatNumber(item.point[1])})</text>`);
    }
    for(let x=-5;x<=5;x++){if(x!==0)parts.push(`<text x="${sx(x)}" y="${sy(0)+20}" text-anchor="middle" fill="#6b778b" font-size="12">${x}</text>`)}
    for(let y=-7;y<=7;y+=2){if(y!==0)parts.push(`<text x="${sx(0)-10}" y="${sy(y)+4}" text-anchor="end" fill="#6b778b" font-size="12">${y}</text>`)}
    svg.innerHTML=parts.join('');
  }

  function setupCommonPoint() {
    const feedback=document.getElementById('commonPointFeedback');
    document.getElementById('revealCommonPointCheck').addEventListener('click',()=>{
      feedback.className='feedback success';
      feedback.innerHTML=String.raw`Para \((x,y)=(2,1)\):<br>\(1=2(2)-3\), \(2+4(1)=6\), \(3(2)-7=-1\) y \(-1-\frac12+\frac32=0\). El punto verifica las cuatro ecuaciones.`;
      markComplete('grafica'); typeset(feedback);
    });
  }

  function setupMatrixBuilder() {
    const target=[[2,-1,3,4],[1,0,-2,-1],[-3,4,1,7]];
    const container=document.getElementById('matrixBuilderInputs');
    target.flat().forEach((_,i)=>{
      const input=document.createElement('input'); input.type='number'; input.dataset.index=i; input.setAttribute('aria-label',`Entrada ${i+1}`); container.appendChild(input);
    });
    const feedback=document.getElementById('matrixBuilderFeedback');
    document.getElementById('checkMatrixBuilder').addEventListener('click',()=>{
      const values=[...container.querySelectorAll('input')].map(i=>Number(i.value));
      const complete=[...container.querySelectorAll('input')].every(i=>i.value!=='');
      if(!complete){setFeedback(feedback,'warning','Completá todas las entradas, incluyendo los ceros.');return;}
      let correct=0;
      values.forEach((v,i)=>{const ok=v===target.flat()[i]; correct+=ok?1:0; container.children[i].classList.toggle('correct',ok); container.children[i].classList.toggle('incorrect',!ok);});
      if(correct===12){
        feedback.className='feedback success'; feedback.innerHTML=String.raw`Correcto: \[\left[\begin{array}{ccc|c}2&-1&3&4\\1&0&-2&-1\\-3&4&1&7\end{array}\right].\]`; markComplete('matricial'); typeset(feedback);
      } else setFeedback(feedback,'danger',`${correct} de 12 entradas son correctas. Revisá signos, orden y coeficientes ausentes.`);
    });
    document.getElementById('resetMatrixBuilder').addEventListener('click',()=>{[...container.querySelectorAll('input')].forEach(i=>{i.value='';i.classList.remove('correct','incorrect');});feedback.textContent='';feedback.className='feedback';});
  }

  function setupEchelonClassifier() {
    const matrix=document.getElementById('echelonMatrix');
    const choices=document.getElementById('echelonChoices');
    const feedback=document.getElementById('echelonFeedback');
    function render(){
      const item=echelonCases[echelonIndex]; matrix.innerHTML=`\[${item.latex}\]`; choices.innerHTML='';
      ['Escalonada','Reducida','Ninguna'].forEach(option=>{
        const b=document.createElement('button'); b.type='button'; b.className='choice-button'; b.textContent=option;
        b.addEventListener('click',()=>{
          const ok=option===item.answer; feedback.className=`feedback ${ok?'success':'danger'}`; feedback.textContent=`${ok?'Correcto.':'No es la clasificación adecuada.'} ${item.explanation}`; if(ok)markComplete('matricial');
        }); choices.appendChild(b);
      }); feedback.textContent='';feedback.className='feedback';typeset(matrix);
    }
    document.getElementById('nextEchelon').addEventListener('click',()=>{echelonIndex=(echelonIndex+1)%echelonCases.length;render();});render();
  }

  function setupRowOperationChallenge() {
    const choices=document.getElementById('rowOperationChoices'); const feedback=document.getElementById('rowOperationFeedback');
    const options=[String.raw`\(F_2\leftarrow F_2-2F_1\)`,String.raw`\(F_2\leftarrow F_2+2F_1\)`,String.raw`\(F_1\leftarrow F_1-2F_2\)`];
    options.forEach((text,i)=>{
      const b=document.createElement('button');b.type='button';b.className='choice-button';b.innerHTML=text;b.addEventListener('click',()=>{
        const ok=i===0; feedback.className=`feedback ${ok?'success':'danger'}`; feedback.innerHTML=ok?String.raw`Correcto: \(2-2(1)=0\). La nueva segunda fila comienza con cero.`:String.raw`Probá la primera entrada: la operación elegida no transforma \(2\) en cero sin alterar el pivote de \(F_1\).`; if(ok)markComplete('gauss');typeset(feedback);
      });choices.appendChild(b);
    });typeset(choices);
  }

  function setupReducedMatrixLab() {
    const matrix=document.getElementById('reducedMatrixCase');const q=document.getElementById('reducedMatrixQuestion');const feedback=document.getElementById('reducedMatrixFeedback');
    function render(){const item=reducedCases[reducedIndex];matrix.innerHTML=`\[${item.latex}\]`;q.innerHTML='<fieldset class="choice-fieldset"><legend>Clasificá el sistema</legend>'+item.options.map((o,i)=>`<label><input type="radio" name="reducedAnswer" value="${i}">${o}</label>`).join('')+'</fieldset>';feedback.textContent='';feedback.className='feedback';typeset(matrix);}
    document.getElementById('checkReducedMatrix').addEventListener('click',()=>{const sel=document.querySelector('input[name="reducedAnswer"]:checked');if(!sel){setFeedback(feedback,'warning','Elegí una clasificación.');return;}const item=reducedCases[reducedIndex],ok=Number(sel.value)===item.answer;feedback.className=`feedback ${ok?'success':'danger'}`;feedback.innerHTML=`${ok?'Correcto.':'Revisá los pivotes y la columna ampliada.'} ${item.explanation}`;if(ok)markComplete('gauss-jordan');typeset(feedback);});
    document.getElementById('nextReducedMatrix').addEventListener('click',()=>{reducedIndex=(reducedIndex+1)%reducedCases.length;render();});render();
  }

  function setupRankLab() {
    const caseEl=document.getElementById('rankCase');const options=document.getElementById('rankOptions');const feedback=document.getElementById('rankFeedback');const counter=document.getElementById('rankCaseCounter');
    function render(){const item=rankCases[rankIndex];counter.textContent=`Caso ${rankIndex+1}`;caseEl.innerHTML=`<p>El sistema tiene <strong>${item.n} incógnitas</strong>.</p><div class="rank-values"><span>Rg(A) = ${item.ra}</span><span>Rg(A′) = ${item.rau}</span><span>n = ${item.n}</span></div>`;options.innerHTML='';[['CD','Compatible determinado'],['CI','Compatible indeterminado'],['I','Incompatible']].forEach(([value,label])=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.textContent=label;b.addEventListener('click',()=>{const ok=value===item.answer;feedback.className=`feedback ${ok?'success':'danger'}`;feedback.textContent=`${ok?'Correcto.':'Revisá las tres consecuencias del teorema.'} ${item.explanation}`;if(ok)markComplete('compatibilidad');});options.appendChild(b);});feedback.textContent='';feedback.className='feedback';}
    document.getElementById('nextRankCase').addEventListener('click',()=>{rankIndex=(rankIndex+1)%rankCases.length;render();});render();
  }

  function setupAbsurdRow() {
    const options=document.getElementById('absurdRowChoices'),feedback=document.getElementById('absurdRowFeedback');
    ['Es una fila nula y puede ignorarse','Representa la contradicción 0 = −2','Indica una variable libre'].forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.textContent=text;b.addEventListener('click',()=>{const ok=i===1;feedback.className=`feedback ${ok?'success':'danger'}`;feedback.innerHTML=ok?String.raw`Correcto. La fila representa \(0x+0y+0z=-2\), una igualdad imposible. El sistema es incompatible.`:'Revisá el término independiente: no es cero.';if(ok)markComplete('compatibilidad');typeset(feedback);});options.appendChild(b);});
  }

  function setupHomogeneousLab() {
    const slider=document.getElementById('homogeneousParam'),value=document.getElementById('homogeneousParamValue'),output=document.getElementById('homogeneousOutput'),feedback=document.getElementById('homogeneousFeedback');
    function update(){const t=Number(slider.value);value.textContent=t;output.innerHTML=String.raw`Para \(t=${t}\): \[(x,y,z)=(${ -3*t},${t},${-2*t}).\]`;feedback.textContent='';feedback.className='feedback';typeset(output);}
    slider.addEventListener('input',update);
    document.getElementById('verifyHomogeneous').addEventListener('click',()=>{const t=Number(slider.value),x=-3*t,y=t,z=-2*t;const vals=[x+y-z,2*x+4*y-z,-x+y+2*z];feedback.className='feedback success';feedback.innerHTML=String.raw`Las tres ecuaciones dan \(${vals.join(', ')}\). Por lo tanto, la terna pertenece al conjunto solución.`;markComplete('homogeneos');typeset(feedback);});update();
  }

  function setupInverseDecision() {
    const caseEl=document.getElementById('inverseDecisionCase'),options=document.getElementById('inverseDecisionOptions'),feedback=document.getElementById('inverseDecisionFeedback');
    function render(){const item=inverseCases[inverseIndex];caseEl.innerHTML=item.text;options.innerHTML='';item.options.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.innerHTML=text;b.addEventListener('click',()=>{const ok=i===item.answer;feedback.className=`feedback ${ok?'success':'danger'}`;feedback.textContent=`${ok?'Correcto.':'Revisá las condiciones del método.'} ${item.explanation}`;if(ok)markComplete('homogeneos');typeset(feedback);});options.appendChild(b);});feedback.textContent='';feedback.className='feedback';typeset(caseEl);typeset(options);}
    document.getElementById('nextInverseDecision').addEventListener('click',()=>{inverseIndex=(inverseIndex+1)%inverseCases.length;render();});render();
  }

  function setupParameterLab() {
    const slider=document.getElementById('parameterSlider'),value=document.getElementById('parameterValue'),row=document.getElementById('parameterRow'),feedback=document.getElementById('parameterFeedback');
    function classification(k){if(k===-3)return'CI';if(k===3)return'I';return'CD';}
    function update(){const k=Number(slider.value),a=k*k-9,b=k+3;value.textContent=k;row.innerHTML=String.raw`\[\left[\begin{array}{ccc|c}0&0&${a}&${b}\end{array}\right]\]`;document.querySelectorAll('input[name="parameterClass"]').forEach(r=>r.checked=false);feedback.textContent='';feedback.className='feedback';typeset(row);}
    slider.addEventListener('input',update);
    document.getElementById('checkParameterClass').addEventListener('click',()=>{const selected=document.querySelector('input[name="parameterClass"]:checked')?.value;if(!selected){setFeedback(feedback,'warning','Elegí una clasificación.');return;}const k=Number(slider.value),answer=classification(k),ok=selected===answer;let explanation=k===-3?'La fila es completamente nula.':k===3?'La fila representa 0=6.':'Hay un pivote no nulo en la tercera columna.';feedback.className=`feedback ${ok?'success':'danger'}`;feedback.textContent=`${ok?'Correcto.':'Revisá los dos valores de la última fila.'} ${explanation}`;if(ok)markComplete('parametros');});update();
  }

  function setupBreakEven() {
    const slider=document.getElementById('barrelsSlider'),value=document.getElementById('barrelsValue'),income=document.getElementById('incomeValue'),cost=document.getElementById('costValue'),difference=document.getElementById('differenceValue'),message=document.getElementById('breakEvenMessage');
    function update(){const q=Number(slider.value),I=50*q-10000,C=20*q+5000,d=I-C;value.textContent=q;income.textContent=formatUSD(I);cost.textContent=formatUSD(C);difference.textContent=formatUSD(d);message.className=`feedback ${d===0?'success':d>0?'success':'warning'}`;message.textContent=d===0?'Punto de equilibrio: ingresos y costos coinciden.':d>0?'Los ingresos superan los costos.':'Los costos superan los ingresos.';if(q===500)markComplete('aplicaciones');}
    slider.addEventListener('input',update);update();
  }

  function setupOctaneLab() {
    const family=document.getElementById('octaneFamily'),feedback=document.getElementById('octaneFeedback'),slider=document.getElementById('octaneParam'),value=document.getElementById('octaneParamValue'),output=document.getElementById('octaneMixOutput');
    document.getElementById('showOctaneFamily').addEventListener('click',()=>{feedback.className='feedback warning';feedback.innerHTML='Hay tres incógnitas y solo dos ecuaciones independientes. El sistema es compatible indeterminado: no existe una única mezcla.';family.hidden=false;update();markComplete('aplicaciones');});
    function update(){const A=Number(slider.value),B=600-2*A,C=A+400;value.textContent=A;output.innerHTML=`<div><span>Combustible A</span><strong>${A} L</strong></div><div><span>Combustible B</span><strong>${B} L</strong></div><div><span>Combustible C</span><strong>${C} L</strong></div>`;}
    slider.addEventListener('input',update);update();
  }

  function setupErrorDetective() {
    const statement=document.getElementById('errorStatement'),options=document.getElementById('errorOptions'),feedback=document.getElementById('errorFeedback'),counter=document.getElementById('errorCaseCounter');
    function render(){const item=errorCases[errorIndex];counter.textContent=`Caso ${errorIndex+1}`;statement.innerHTML=item.statement;options.innerHTML='';item.options.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.innerHTML=text;b.addEventListener('click',()=>{const ok=i===item.answer;feedback.className=`feedback ${ok?'success':'danger'}`;feedback.textContent=`${ok?'Correcto.':'Volvé a revisar la afirmación.'} ${item.explanation}`;if(ok)markComplete('practica');typeset(feedback);});options.appendChild(b);});feedback.textContent='';feedback.className='feedback';typeset(statement);typeset(options);}
    document.getElementById('nextErrorCase').addEventListener('click',()=>{errorIndex=(errorIndex+1)%errorCases.length;render();});render();
  }

  function setupResolutionPlan() {
    const list=document.getElementById('resolutionPlan'),feedback=document.getElementById('resolutionPlanFeedback');
    function render(){list.innerHTML='';currentPlan.forEach((text,i)=>{const li=document.createElement('li');li.innerHTML=`<span>${text}</span><div class="move-buttons"><button type="button" aria-label="Subir paso">↑</button><button type="button" aria-label="Bajar paso">↓</button></div>`;const [up,down]=li.querySelectorAll('button');up.addEventListener('click',()=>move(i,-1));down.addEventListener('click',()=>move(i,1));list.appendChild(li);});}
    function move(i,d){const j=i+d;if(j<0||j>=currentPlan.length)return;[currentPlan[i],currentPlan[j]]=[currentPlan[j],currentPlan[i]];render();}
    function shuffle(){currentPlan=[...resolutionPlanSteps].sort(()=>Math.random()-.5);render();feedback.textContent='';feedback.className='feedback';}
    document.getElementById('checkResolutionPlan').addEventListener('click',()=>{const ok=currentPlan.every((v,i)=>v===resolutionPlanSteps[i]);feedback.className=`feedback ${ok?'success':'danger'}`;feedback.textContent=ok?'El plan está en un orden coherente.':'Todavía hay decisiones fuera de orden. Primero se representa, luego se transforma, se clasifica y se escribe la solución.';if(ok)markComplete('practica');});
    document.getElementById('shuffleResolutionPlan').addEventListener('click',shuffle);shuffle();
  }

  function setupVideos() {
    document.querySelectorAll('.video-card').forEach(card=>{
      const button=card.querySelector('.load-video');
      button?.addEventListener('click',()=>{
        const id=card.dataset.videoId;
        const placeholder=card.querySelector('.video-placeholder');
        placeholder.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}" title="Video educativo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        button.disabled=true;button.textContent='Video cargado';
      });
    });
  }

  function setupQuiz() {
    const form=document.getElementById('quizForm'),actions=document.getElementById('quizActions'),result=document.getElementById('quizResult');
    function generate(){currentQuiz=shuffleArray([...quizBank]).slice(0,10);form.innerHTML=currentQuiz.map((item,i)=>`<fieldset class="quiz-question"><legend><span>${i+1}</span>${item.q}</legend>${item.options.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"><span>${o}</span></label>`).join('')}<div class="question-feedback" id="qf${i}"></div></fieldset>`).join('');actions.hidden=false;result.innerHTML='';typeset(form);}
    document.getElementById('startQuiz').addEventListener('click',generate);document.getElementById('newQuiz').addEventListener('click',generate);
    form.addEventListener('submit',e=>{e.preventDefault();let score=0;currentQuiz.forEach((item,i)=>{const selected=form.querySelector(`input[name="q${i}"]:checked`);const box=document.getElementById(`qf${i}`);const ok=selected&&Number(selected.value)===item.a;if(ok)score++;box.className=`question-feedback ${ok?'correct':'incorrect'}`;box.textContent=`${ok?'Correcto.':'Respuesta a revisar.'} ${item.e}`;});const percent=Math.round(score/currentQuiz.length*100);result.innerHTML=`<strong>${score} / ${currentQuiz.length}</strong><p>${percent>=80?'Muy buen dominio de la unidad.':percent>=60?'Buen avance; revisá las devoluciones.':'Conviene volver a los módulos señalados por las devoluciones.'}</p>`;result.className=`quiz-result ${percent>=60?'success':'warning'}`;if(percent>=70)markComplete('autoevaluacion');typeset(form);});
  }

  function setupGlobalActions() {
    document.getElementById('resetProgressButton').addEventListener('click',()=>{
      if(!confirm('¿Querés borrar todo el progreso guardado de esta unidad?'))return;
      completed.clear();saveProgress();document.querySelectorAll('[data-complete]').forEach(b=>setCompleteButtonState(b,false));updateProgressUI();
    });
    document.getElementById('printButton').addEventListener('click',()=>{
      const states=[...document.querySelectorAll('.module')].map(m=>({m,hidden:m.hidden}));
      states.forEach(({m})=>m.hidden=false);document.body.classList.add('print-all');
      setTimeout(()=>window.print(),100);
      const restore=()=>{states.forEach(({m,hidden})=>m.hidden=hidden);document.body.classList.remove('print-all');window.removeEventListener('afterprint',restore);};
      window.addEventListener('afterprint',restore);
    });
  }

  function setFeedback(element,type,text){element.className=`feedback ${type}`;element.textContent=text;}
  function typeset(root=document){if(window.MathJax?.typesetPromise){window.MathJax.typesetPromise(root===document?undefined:[root]).catch(()=>{});}}
  function formatNumber(n){if(Number.isInteger(n))return String(n);return String(Math.round(n*100)/100).replace('.',',');}
  function formatSignedInput(n){return n<0?`(${formatNumber(n)})`:formatNumber(n);}
  function formatUSD(n){return new Intl.NumberFormat('es-AR',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);}
  function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
  function shuffleArray(array){for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;}
})();
