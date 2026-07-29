# Unidad 3 · Sistemas de Ecuaciones Lineales

Proyecto web estático para **Álgebra y Geometría I – Ingeniería en Petróleo**. Reorganiza la teoría de 2026, el Trabajo Práctico 3, su resolución, el resumen y las presentaciones de clase como una unidad interactiva preparada para GitHub Pages.

## Contenidos

- Ecuaciones lineales con varias incógnitas, solución general y soluciones particulares.
- Interpretación geométrica de sistemas de dos incógnitas.
- Sistemas compatibles determinados, compatibles indeterminados e incompatibles.
- Representación matricial `AX = B` y matriz ampliada `[A|B]`.
- Matrices escalonadas y escalonadas reducidas.
- Método de eliminación de Gauss.
- Método de Gauss-Jordan.
- Sistemas lineales homogéneos.
- Resolución por matriz inversa.
- Rango por filas y Teorema de Rouché-Fröbenius.
- Sistemas con parámetros.
- Aplicaciones a producción petrolera, mezclas, flujos y presión de tuberías.
- Práctica guiada, detección de errores y autoevaluación aleatoria.

Las expresiones matemáticas se muestran con **MathJax**. El progreso se guarda en el navegador mediante `localStorage`.

## Actividades interactivas

- Generador de soluciones particulares a partir de una solución general.
- Comprobador de duplas y ternas.
- Laboratorio gráfico de rectas secantes, coincidentes y paralelas.
- Constructor de matrices ampliadas.
- Clasificador de matrices escalonadas y reducidas.
- Resoluciones progresivas de Gauss y Gauss-Jordan.
- Lectura de matrices reducidas del TP.
- Clasificador mediante rangos.
- Explorador de soluciones de sistemas homogéneos.
- Selector de método: inversa o Gauss.
- Laboratorio de sistemas con parámetro.
- Simulador del punto de equilibrio.
- Análisis de una mezcla de combustibles subdeterminada.
- Banco aleatorio de preguntas.

## Estructura

```text
unidad-3-sistemas-ecuaciones-lineales-github/
├── index.html
├── styles.css
├── app.js
├── README.md
├── manifest.webmanifest
├── .nojekyll
├── assets/
│   └── favicon.svg
├── materiales/
│   ├── teoria-sel-2026.pdf
│   ├── tp-3-sistemas-lineales.pdf
│   ├── tp-3-sistemas-lineales.tex
│   ├── resolucion-tp-3.pdf
│   ├── resolucion-tp-3.tex
│   ├── resumen-y-ejemplos.pdf
│   └── resumen-y-ejemplos.tex
└── presentaciones/
    ├── 01-clase-sel-parte-1.ppsx
    └── 02-clase-sel-parte-2.ppsx
```

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir **el contenido interior de esta carpeta** a la raíz del repositorio.
3. Abrir `Settings` → `Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar la rama `main` y la carpeta `/ (root)`.
6. Guardar y esperar a que GitHub muestre la dirección publicada.

No se necesita `package.json`, Node.js ni servidor.

## Probar localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000`.

## Revisión de los materiales

La página conserva el enfoque, la terminología y la secuencia de la cátedra. Se hacen explícitas estas observaciones:

- De `3x - 7 = -y` se obtiene `y = -3x + 7`. En una figura de la resolución aparece una etiqueta con `7/2`, pero el desarrollo y el punto común `(2,1)` corresponden a `+7`.
- En el desarrollo del sistema 2(ii), después de obtener `x = 11/8` e `y = -1/4`, una frase muestra otro par ordenado. La página utiliza los valores obtenidos en el cálculo.
- En la lectura de la matriz reducida del ejercicio 6(e), de `x1 + x2 + x3 = 1` debe escribirse `x1 = 1 - x2 - x3`.
- El problema de mezcla de tres combustibles aporta dos ecuaciones independientes para tres incógnitas. Tal como está escrito tiene una familia de soluciones; se necesita una tercera condición para obtener una mezcla única.

## Edición rápida

- Colores y diseño: variables al comienzo de `styles.css`.
- Ejemplos guiados y preguntas: objetos al comienzo de `app.js`.
- Videos: atributo `data-video-id` de cada tarjeta en `index.html`.
- Textos y estructura de la unidad: `index.html`.
