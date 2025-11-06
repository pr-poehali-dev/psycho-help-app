import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Practice {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  icon: string;
}

interface DiaryEntry {
  id: string;
  date: string;
  problem: string;
  mood: number;
}

const Index = () => {
  const [problem, setProblem] = useState('');
  const [practices, setPractices] = useState<Practice[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    { id: '1', date: '2024-11-05', problem: 'Чувствую тревогу перед встречами', mood: 4 },
    { id: '2', date: '2024-11-03', problem: 'Сложно сосредоточиться на работе', mood: 5 },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedPractices, setCompletedPractices] = useState(12);

  const allPractices: Practice[] = [
    {
      id: '1',
      title: 'Дыхательная практика "4-7-8"',
      description: 'Техника глубокого дыхания для снижения тревожности. Вдох на 4 счёта, задержка на 7, выдох на 8.',
      duration: '5 минут',
      category: 'Тревога',
      icon: 'Wind',
    },
    {
      id: '2',
      title: 'Прогрессивная мышечная релаксация',
      description: 'Поочередное напряжение и расслабление групп мышц для снятия физического напряжения.',
      duration: '15 минут',
      category: 'Стресс',
      icon: 'Sparkles',
    },
    {
      id: '3',
      title: 'Практика благодарности',
      description: 'Запишите 3 вещи, за которые вы благодарны сегодня. Помогает фокусироваться на позитивном.',
      duration: '10 минут',
      category: 'Настроение',
      icon: 'Heart',
    },
    {
      id: '4',
      title: 'Техника заземления "5-4-3-2-1"',
      description: 'Найдите 5 вещей, которые видите, 4 - которые слышите, 3 - которые можете потрогать, 2 - которые чувствуете запах, 1 - которую можете попробовать.',
      duration: '7 минут',
      category: 'Тревога',
      icon: 'Anchor',
    },
    {
      id: '5',
      title: 'Медитация осознанности',
      description: 'Сосредоточьтесь на настоящем моменте, наблюдая за своими мыслями без оценки.',
      duration: '10 минут',
      category: 'Концентрация',
      icon: 'Brain',
    },
    {
      id: '6',
      title: 'Переформулирование мыслей',
      description: 'Запишите негативную мысль и найдите альтернативный, более реалистичный взгляд на ситуацию.',
      duration: '12 минут',
      category: 'Мышление',
      icon: 'Lightbulb',
    },
  ];

  const analyzeProblem = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const keywords = problem.toLowerCase();
      let recommended: Practice[] = [];
      
      if (keywords.includes('тревог') || keywords.includes('беспокой') || keywords.includes('волну')) {
        recommended = allPractices.filter(p => ['1', '4'].includes(p.id));
      } else if (keywords.includes('стресс') || keywords.includes('напряж')) {
        recommended = allPractices.filter(p => ['2', '5'].includes(p.id));
      } else if (keywords.includes('грус') || keywords.includes('подавлен') || keywords.includes('настроение')) {
        recommended = allPractices.filter(p => ['3', '5'].includes(p.id));
      } else if (keywords.includes('сосредоточ') || keywords.includes('концентр') || keywords.includes('внимание')) {
        recommended = allPractices.filter(p => ['5', '4'].includes(p.id));
      } else if (keywords.includes('мысл') || keywords.includes('думаю')) {
        recommended = allPractices.filter(p => ['6', '5'].includes(p.id));
      } else {
        recommended = allPractices.slice(0, 3);
      }
      
      setPractices(recommended);
      
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        problem: problem,
        mood: 5,
      };
      setDiaryEntries([newEntry, ...diaryEntries]);
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const getProgressMessage = () => {
    if (completedPractices < 5) return 'Начало пути';
    if (completedPractices < 15) return 'Отличное начало!';
    if (completedPractices < 30) return 'Вы молодец!';
    return 'Впечатляющий прогресс!';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Путь к себе
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ваш личный помощник в работе с эмоциями и психологическим состоянием
          </p>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="diary" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              Дневник
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              Прогресс
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <Card className="p-8 shadow-lg border-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon name="MessageCircle" size={28} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Что вас беспокоит?</h2>
                  <p className="text-muted-foreground">Опишите свои мысли и чувства</p>
                </div>
              </div>
              
              <Textarea
                placeholder="Например: Чувствую тревогу перед важными встречами, сложно сосредоточиться..."
                className="min-h-[150px] text-base resize-none border-2 focus:border-primary mb-4"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
              
              <Button
                onClick={analyzeProblem}
                disabled={!problem.trim() || isAnalyzing}
                className="w-full h-12 text-lg font-medium"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Подобрать практики
                  </>
                )}
              </Button>
            </Card>

            {practices.length > 0 && (
              <div className="animate-scale-in">
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="Star" size={24} className="text-primary" />
                  <h2 className="text-2xl font-semibold">Рекомендуемые практики</h2>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {practices.map((practice) => (
                    <Card key={practice.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-accent/50">
                          <Icon name={practice.icon} size={28} className="text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{practice.title}</h3>
                          </div>
                          <Badge variant="secondary" className="mb-3">
                            {practice.category}
                          </Badge>
                          <p className="text-muted-foreground font-serif mb-4 leading-relaxed">
                            {practice.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Clock" size={16} />
                              {practice.duration}
                            </div>
                            <Button size="sm" className="rounded-full">
                              Начать
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="diary" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-secondary/50">
                  <Icon name="BookOpen" size={28} className="text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Дневник переживаний</h2>
                  <p className="text-muted-foreground">История ваших обращений</p>
                </div>
              </div>

              <div className="space-y-4">
                {diaryEntries.map((entry) => (
                  <Card key={entry.id} className="p-6 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        {new Date(entry.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Настроение:</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Heart"
                              size={16}
                              className={i < entry.mood ? 'text-red-400 fill-red-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="font-serif text-foreground leading-relaxed">{entry.problem}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon name="Award" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Выполнено практик</h2>
                    <p className="text-muted-foreground">{getProgressMessage()}</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">{completedPractices}</div>
                  <p className="text-muted-foreground">из 50 практик</p>
                </div>

                <Progress value={(completedPractices / 50) * 100} className="h-3 mb-4" />

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">7</div>
                    <div className="text-sm text-muted-foreground">Дней подряд</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Записей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">89%</div>
                    <div className="text-sm text-muted-foreground">Улучшение</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-accent/50">
                    <Icon name="BarChart3" size={28} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Категории практик</h2>
                    <p className="text-muted-foreground">Ваша активность</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { name: 'Тревога', count: 5, color: 'bg-purple-400' },
                    { name: 'Стресс', count: 3, color: 'bg-orange-400' },
                    { name: 'Настроение', count: 2, color: 'bg-pink-400' },
                    { name: 'Концентрация', count: 2, color: 'bg-blue-400' },
                  ].map((category) => (
                    <div key={category.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">{category.count} практик</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} transition-all duration-500`}
                          style={{ width: `${(category.count / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-accent/20 rounded-xl">
                  <div className="flex items-center gap-2 text-accent-foreground">
                    <Icon name="TrendingUp" size={20} />
                    <p className="font-medium">
                      За последнюю неделю вы выполнили на 40% больше практик!
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 shadow-lg mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-secondary/50">
                  <Icon name="Target" size={28} className="text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Достижения</h2>
                  <p className="text-muted-foreground">Ваши успехи на пути</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'Flame', title: 'Неделя подряд', unlocked: true },
                  { icon: 'Trophy', title: '10 практик', unlocked: true },
                  { icon: 'Star', title: 'Первая запись', unlocked: true },
                  { icon: 'Crown', title: '50 практик', unlocked: false },
                ].map((achievement, i) => (
                  <Card
                    key={i}
                    className={`p-6 text-center transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-muted/30 opacity-50'
                    }`}
                  >
                    <Icon
                      name={achievement.icon}
                      size={40}
                      className={`mx-auto mb-3 ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                    <p className="font-medium text-sm">{achievement.title}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
