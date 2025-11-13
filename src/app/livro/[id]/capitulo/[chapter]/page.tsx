"use client";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { ChevronLeft, ChevronRight, Sun, Moon, Type, BookOpen, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const chapterContent = `Emma respirou fundo antes de entrar no imponente prédio da Blackwood Enterprises. Aquele seria seu primeiro dia como assistente executiva, e ela estava determinada a causar uma boa impressão.

O lobby era ainda mais impressionante do que ela imaginava. Mármore italiano, lustres de cristal e uma atmosfera de poder e sofisticação que fazia seu coração acelerar.

"Você deve ser Emma Carter", uma voz feminina a tirou de seus pensamentos. Uma mulher elegante de terno azul marinho se aproximou com um sorriso profissional. "Sou Sarah, da equipe de RH. Bem-vinda à Blackwood Enterprises."

Emma apertou sua mão com firmeza. "Muito prazer. Estou ansiosa para começar."

"Ótimo. Vou levá-la até o 45º andar. O Sr. Blackwood está esperando por você."

O elevador subiu rapidamente, e Emma sentiu seu estômago revirar. Não era nervosismo comum - era algo mais. Uma sensação estranha de que sua vida estava prestes a mudar completamente.

As portas se abriram revelando um corredor amplo com vista panorâmica da cidade. Sarah a guiou até uma porta de madeira escura com uma placa dourada: "Marcus Blackwood - CEO".

"Pode entrar", Sarah disse com um aceno de cabeça antes de se retirar.

Emma bateu levemente na porta.

"Entre", uma voz profunda e autoritária respondeu.

Ela abriu a porta e seu coração parou por um momento. Atrás de uma mesa executiva estava o homem mais atraente que ela já tinha visto. Cabelos escuros perfeitamente penteados, olhos azuis penetrantes e uma mandíbula marcada que parecia esculpida em mármore.

Marcus Blackwood levantou os olhos dos documentos que analisava e seus olhares se encontraram. Por um breve momento, algo passou entre eles - uma faísca, uma conexão inexplicável.

"Srta. Carter", ele disse, sua voz enviando um arrepio pela espinha dela. "Sente-se, por favor."

Emma se aproximou, tentando manter a compostura profissional, mas era impossível ignorar a presença magnética dele.

"Eu revisei seu currículo", Marcus continuou, seus olhos nunca deixando os dela. "Impressionante. Formada com honras, experiência em empresas de prestígio. Mas me diga, por que você quer trabalhar aqui?"

Emma respirou fundo. "Porque a Blackwood Enterprises é líder em inovação. Quero fazer parte de algo maior, aprender com os melhores."

Um sorriso quase imperceptível tocou os lábios dele. "Ambiciosa. Eu gosto disso."

Ele se levantou e caminhou até a janela, as mãos nos bolsos da calça do terno impecável. "Este trabalho não será fácil, Srta. Carter. Eu sou exigente, perfeccionista. Espero excelência em tudo."

"Eu não esperaria menos", Emma respondeu, surpreendendo-se com sua própria confiança.

Marcus se virou para encará-la, e novamente aquela conexão elétrica passou entre eles. Ele deu alguns passos em sua direção, parando a poucos metros dela.

"Então bem-vinda à equipe", ele estendeu a mão.

Quando Emma tocou sua mão, foi como se uma corrente elétrica percorresse seu corpo. Pelos olhos dele, ela percebeu que ele também havia sentido.

Mas tão rapidamente quanto o momento surgiu, ele se desfez. Marcus soltou sua mão e voltou para trás da mesa, sua expressão voltando à máscara profissional.

"Sarah lhe mostrará sua estação de trabalho. Espero você aqui amanhã às 7h em ponto. Temos uma reunião importante."

"Estarei aqui", Emma disse, se levantando.

Enquanto caminhava em direção à porta, ela sentiu os olhos dele em suas costas. E quando se virou para um último olhar, ele ainda a observava com uma expressão que ela não conseguia decifrar.

Aquele seria apenas o começo de uma história que mudaria suas vidas para sempre.`;

export default function ChapterPage({
  params,
}: {
  params: { id: string; chapter: string };
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const bookTitle = "Amor Proibido: O Segredo do Bilionário";
  const chapterNumber = parseInt(params.chapter);
  const chapterTitle = `Capítulo ${chapterNumber}: O Encontro`;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Header />

      {/* Reading Controls */}
      <div className={`fixed top-16 left-0 right-0 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${isDarkMode ? "border-gray-700" : "border-pink-100"} z-40`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back to Book */}
            <Link
              href={`/livro/${params.id}`}
              className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-pink-600"} transition-colors`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar ao Livro</span>
            </Link>

            {/* Reading Controls */}
            <div className="flex items-center space-x-4">
              {/* Font Size */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className={`p-2 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-pink-50"} rounded-lg transition-colors`}
                >
                  <Type className="w-4 h-4" />
                </button>
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className={`p-2 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-pink-50"} rounded-lg transition-colors`}
                >
                  <Type className="w-5 h-5" />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-pink-50"} rounded-lg transition-colors`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Header */}
          <div className="mb-8 text-center">
            <Link
              href={`/livro/${params.id}`}
              className={`text-sm ${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-pink-600"} transition-colors mb-2 inline-block`}
            >
              {bookTitle}
            </Link>
            <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
              {chapterTitle}
            </h1>
            <div className={`flex items-center justify-center space-x-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <span>Publicado há 3 dias</span>
              <span>•</span>
              <span>15.234 visualizações</span>
            </div>
          </div>

          {/* Chapter Text */}
          <div
            className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <div className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-800"} whitespace-pre-line`}>
              {chapterContent}
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="mt-12 pt-8 border-t border-pink-200">
            <div className="flex items-center justify-between">
              {chapterNumber > 1 ? (
                <Link
                  href={`/livro/${params.id}/capitulo/${chapterNumber - 1}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Capítulo Anterior</span>
                </Link>
              ) : (
                <div></div>
              )}

              <Link
                href={`/livro/${params.id}/capitulo/${chapterNumber + 1}`}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <span>Próximo Capítulo</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2 text-center`}>
              Capítulo {chapterNumber} de 120
            </div>
            <div className={`w-full h-2 ${isDarkMode ? "bg-gray-700" : "bg-pink-100"} rounded-full overflow-hidden`}>
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                style={{ width: `${(chapterNumber / 120) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-t ${isDarkMode ? "border-gray-700" : "border-pink-100"} z-40`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {chapterNumber > 1 ? (
              <Link
                href={`/livro/${params.id}/capitulo/${chapterNumber - 1}`}
                className={`flex items-center space-x-2 px-4 py-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-pink-50 text-pink-600 hover:bg-pink-100"} rounded-full font-medium transition-colors`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Link>
            ) : (
              <div></div>
            )}

            <Link
              href={`/livro/${params.id}`}
              className={`flex items-center space-x-2 px-4 py-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-pink-50 text-pink-600 hover:bg-pink-100"} rounded-full font-medium transition-colors`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Todos os Capítulos</span>
            </Link>

            <Link
              href={`/livro/${params.id}/capitulo/${chapterNumber + 1}`}
              className={`flex items-center space-x-2 px-4 py-2 ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-pink-50 text-pink-600 hover:bg-pink-100"} rounded-full font-medium transition-colors`}
            >
              <span className="hidden sm:inline">Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <Footer />
      </div>
    </div>
  );
}
