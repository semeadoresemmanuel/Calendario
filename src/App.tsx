import React, { useState, useMemo, useEffect } from 'react';
import { 
  format, 
  eachDayOfInterval, 
  isMonday, 
  addMonths, 
  startOfMonth, 
  endOfMonth,
  isSameDay,
  parseISO,
  isValid,
  isAfter,
  nextMonday,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  differenceInDays,
  compareAsc
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Plus, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Trash,
  Pencil,
  Settings,
  CalendarDays,
  List,
  Moon,
  Sun,
  Lock,
  LockOpen,
  X,
  Filter,
  User,
  Upload,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { CalendarItem, DateRange, ItemType } from '@/src/types';

const springConf = { type: "spring", stiffness: 350, damping: 30 };

type Tab = 'calendar' | 'list';
type ViewMode = 'DAY' | 'MONTH' | 'YEAR';

const CalendarHeaderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 132.29167 132.29167" className={className} fill="currentColor">
    <path d="M 26.177701,6.0614648e-6 C 11.700109,6.0614648e-6 8.7646483e-7,11.699965 8.7646483e-7,26.177705 V 106.1136 C 8.7646483e-7,120.59134 11.700109,132.29167 26.177701,132.29167 h 79.936259 c 14.47759,0 26.17771,-11.70033 26.17771,-26.17807 V 26.177705 C 132.29167,11.699965 120.59155,6.0614648e-6 106.11396,6.0614648e-6 Z m 0,2.8686062385352 h 79.936259 c 12.93791,0 23.30909,10.3710507 23.30909,23.3090927 V 106.1136 c 0,12.93804 -10.37118,23.30909 -23.30909,23.30909 H 26.177701 c -12.937909,0 -23.3087253,-10.37105 -23.3087253,-23.30909 V 26.177705 c 0,-12.938042 10.3708163,-23.3090927 23.3087253,-23.3090927 z M 42.536904,20.066165 c -1.546553,0 -2.808566,1.262795 -2.808566,2.809306 v 3.921541 c 0,1.546547 1.262013,2.808566 2.808566,2.808566 h 1.227128 c 1.546503,0 2.809304,-1.262019 2.809304,-2.808566 v -1.961326 -1.960215 c 0,-1.546547 -1.262801,-2.809306 -2.809304,-2.809306 z m 53.641079,0 c -1.546531,0 -2.808565,1.262795 -2.808565,2.809306 v 3.921541 c 0,1.546547 1.262034,2.808566 2.808565,2.808566 h 1.227502 c 1.546495,0 2.809305,-1.262019 2.809305,-2.808566 v -1.961326 -1.960215 c 0,-1.546547 -1.26281,-2.809306 -2.809305,-2.809306 z m -66.946372,6.017401 c -2.045397,0 -3.711765,1.666302 -3.711765,3.711769 -0.04347,0.484075 0.09004,35.1415 -0.04966,35.640396 -0.04346,0.42384 -7.35856,23.904879 -6.724917,23.390993 l -0.02112,0.0085 c -0.244155,3.94621 2.813041,7.727478 6.729365,8.311175 6.989993,0.858139 28.891014,-1.87571 43.528683,-9.36411 h -14.0243 c 0.533828,-4.804783 1.701564,-15.356238 2.220391,-20.065795 h 20.090619 l 1.582176,14.288553 c 0.792544,-0.555174 1.567344,-1.12193 2.324165,-1.703748 -0.344705,-3.129976 -1.047264,-9.478459 -1.391309,-12.584805 h 13.549899 c 0.573785,-0.81819 1.127861,-1.645761 1.656678,-2.493903 H 79.638657 V 52.554802 h 19.836 v 12.16823 c 2.943463,1.2572 7.893153,4.005973 12.123753,9.394125 l -2.5899,-8.681053 c -0.0296,-0.119507 -0.0489,-0.239236 -0.0489,-0.358763 V 29.794964 c 0,-2.045396 -1.66126,-3.711398 -3.71177,-3.711398 H 102.698 c 0.28427,3.192941 -2.03975,6.007028 -5.302473,6.01666 h -1.227494 c -3.262665,-0.0084 -5.587539,-2.823719 -5.303215,-6.01666 H 49.056496 c 0.284289,3.192941 -2.040829,6.007028 -5.303581,6.01666 h -1.227127 c -3.262665,-0.0084 -5.58716,-2.823719 -5.302842,-6.01666 z m 5.772426,10.975569 H 54.839665 V 50.059773 H 35.004037 Z m 22.325091,0 H 77.160316 V 50.059773 H 57.329128 Z m 22.33065,0 H 99.495786 V 50.059773 H 79.659778 Z M 35.004037,52.554423 H 54.839665 V 65.221139 H 35.004037 Z m 22.325091,0 H 77.160316 V 65.221139 H 57.329128 Z m 39.832489,13.936094 v 7.17e-4 0.0022 C 92.521665,73.931458 86.170678,80.295719 78.282921,85.414378 v 0.0022 c -8.027065,5.303179 -18.83793,9.533605 -28.965502,11.758689 15.061675,-0.185014 30.178473,-0.833331 45.005237,-3.642089 2.95344,-0.553812 5.887014,-1.19213 8.805584,-1.910551 1.03272,-0.259353 2.07063,-0.508678 3.09839,-0.803138 2.40979,-0.753248 4.7145,-2.209844 6.2761,-4.095736 C 118.53787,78.90585 97.380383,66.58488 97.161617,66.490726 Z M 34.684928,67.716161 H 54.690674 C 54.146883,72.605145 53.01413,82.847454 52.470288,87.781578 H 28.692732 Z m 77.523892,22.739071 c -1.31205,1.012665 -2.77491,1.840739 -4.32143,2.42942 -16.184297,4.709577 -32.548033,6.077147 -49.510145,6.605949 -9.558392,0.278365 -20.50967,0.258692 -31.550217,0.258692 -1.67625,-0.0084 -3.352687,-0.394148 -4.844389,-1.16745 v 0.0022 c -0.194726,-0.104732 -0.388842,-0.214112 -0.57854,-0.323929 0.433939,2.100276 1.695801,4.001306 3.551659,5.198706 0.977788,0.62855 2.076366,1.03695 3.228849,1.19674 0.378894,0.0507 0.75763,0.08 1.141882,0.08 1.088107,-0.0534 75.327951,0.0971 76.530251,-0.0296 1.73616,-0.12924 3.42365,-0.86362 4.71579,-2.031 1.80605,-1.61147 2.81832,-4.021344 2.68367,-6.421015 -0.0296,-0.698497 -0.17975,-1.376426 -0.36433,-2.049902 z M 25.520585,106.52721 v 0.82315 c 0,2.68407 2.184383,4.86959 4.86848,4.86959 l 73.707235,0.005 c 2.6841,0 4.86921,-2.1851 4.86921,-4.86921 v -0.81796 c -1.1973,0.45906 -2.50528,0.69343 -3.79737,0.69825 H 29.321677 c -0.174866,0 -0.354266,-0.005 -0.533694,-0.0126 -1.112556,-0.06 -2.219841,-0.28943 -3.262579,-0.68899 z" />
  </svg>
);

const CalendarCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 138.84134 132.29167" className={className} fill="currentColor">
    <path d="m 33.711023,0 c -3.03566,0 -5.43285,2.3971938 -5.43285,5.4328462 v 7.1896508 h -11.98277 c -4.79312,0 -9.1062998,2.077695 -12.1419498,5.432856 v 0.15942 C 1.5971432,21.090646 5.3219298e-5,24.764086 5.3219298e-5,28.918146 V 117.38495 A 14.90558,14.90558 0 0 0 14.906763,132.29167 H 123.9347 a 14.905563,14.905563 0 0 0 14.90671,-14.90672 V 28.918146 c 0,-4.15406 -1.59702,-7.8275 -4.15339,-10.703373 v -0.15942 h -0.16244 c -3.03559,-3.355161 -7.34883,-5.432856 -12.14195,-5.432856 H 110.40079 V 5.4328462 C 110.40079,2.3971938 108.0036,0 104.96794,0 h -8.147667 c -3.03566,0 -5.43279,2.3971938 -5.43279,5.4328462 v 7.1896508 h -49.24379 V 5.4328462 C 47.291363,2.3971938 44.894173,0 41.858513,0 Z m -12.23554,49.528964 h 95.728247 a 10.611789,10.611789 0 0 1 10.61287,10.612863 v 50.671043 a 10.611771,10.611771 0 0 1 -10.61287,10.61291 H 21.475483 A 10.611789,10.611789 0 0 1 10.865693,110.81287 V 60.141827 a 10.611771,10.611771 0 0 1 10.60979,-10.612863 z m 7.12413,11.502221 c -2.55632,0 -4.79313,2.076974 -4.79313,4.793127 v 8.15081 c 0,2.556313 2.07703,4.793118 4.79313,4.793118 h 13.25908 c 2.55632,0 4.79312,-2.077025 4.79312,-4.793118 v -8.15081 c 0,-2.556373 -2.2368,-4.793127 -4.79312,-4.793127 z m 34.19157,0 c -2.55631,0 -4.79312,2.076974 -4.79312,4.793127 v 8.15081 c 0,2.556313 2.07703,4.793118 4.79312,4.793118 h 13.25909 c 2.55637,0 4.79313,-2.077025 4.79313,-4.793118 v -8.15081 c 0,-2.556373 -2.23676,-4.793127 -4.79313,-4.793127 z m 34.18844,0 c -2.55637,0 -4.79312,2.076974 -4.79312,4.793127 v 8.15081 c 0,2.556313 2.07697,4.793118 4.79312,4.793118 h 13.262237 c 2.55631,0 4.79312,-2.077025 4.79312,-4.793118 v -8.15081 c 0,-2.556373 -2.23681,-4.793127 -4.79312,-4.793127 z m -68.38001,29.879004 c -2.55632,0 -4.79313,2.077035 -4.79313,4.793128 v 8.147673 c 0,2.55631 2.07703,4.79312 4.79313,4.79312 h 13.25908 c 2.55632,0 4.79312,-2.07703 4.79312,-4.79312 v -8.147673 c 0,-2.556314 -2.2368,-4.793128 -4.79312,-4.793128 z m 34.19157,0 c -2.55631,0 -4.79312,2.077035 -4.79312,4.793128 v 8.147673 c 0,2.55631 2.07703,4.79312 4.79312,4.79312 h 13.25909 c 2.55637,0 4.79313,-2.07703 4.79313,-4.79312 v -8.147673 c 0,-2.556314 -2.23676,-4.793128 -4.79313,-4.793128 z m 34.18844,0 c -2.55631,0 -4.79312,2.077035 -4.79312,4.793128 v 8.147673 c 0,2.55631 2.07703,4.79312 4.79312,4.79312 h 13.262237 c 2.55637,0 4.79312,-2.07703 4.79312,-4.79312 v -8.147673 c 0,-2.556314 -2.23675,-4.793128 -4.79312,-4.793128 z" />
  </svg>
);

const FunnelCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 146.01091 132.29167" className={className} fill="currentColor">
    <path d="M 120.20045,0.00471911 C 116.81778,-0.0880809 113.42006,1.1884493 110.90702,3.7755095 106.43938,8.37473 106.23124,15.600681 110.43571,20.439811 L 89.795586,46.081684 c -4.816401,-2.56759 -10.754111,-1.68094 -14.593332,2.17587 L 59.437603,37.542613 c 1.76829,-3.96843 1.30246,-8.568451 -1.2292,-12.101561 -2.531651,-3.538781 -6.750991,-5.481851 -11.095891,-5.119071 -4.350369,0.36855 -8.184328,2.993321 -10.081665,6.900291 -1.897332,3.90697 -1.584374,8.523111 0.835082,12.134491 L 19.510581,56.993895 c -3.210933,-2.27158 -7.318838,-2.88609 -11.0573105,-1.64694 -3.7442253,1.23909 -6.6644206,4.18018 -7.86578874,7.90875 -1.20128312,3.734051 -0.53807206,7.816071 1.78592414,10.980731 2.3239852,3.170381 6.0279986,5.039471 9.9686661,5.045091 l 0.0112,-0.0212 c 4.552558,0.005 8.741982,-2.48481 10.891946,-6.475521 2.15557,-3.99081 1.919561,-8.835611 -0.600823,-12.603061 L 40.999748,42.544553 h 0.0053 c 4.911824,3.493981 11.653444,2.929951 15.907974,-1.34001 l 15.761902,10.717641 c -1.82993,4.096881 -1.26189,8.852851 1.46621,12.419482 2.72809,3.561 7.195581,5.36391 11.647101,4.69977 4.457151,-0.65863 8.195821,-3.68398 9.756451,-7.886861 1.5661,-4.20293 0.70098,-8.913571 -2.2517,-12.301591 L 113.93311,23.243982 c 5.65838,3.04195 12.71574,1.29367 16.28004,-4.031111 3.55898,-5.33045 2.44696,-12.4734612 -2.56589,-16.4807116 -2.19312,-1.7533202 -4.8159,-2.65441028 -7.44687,-2.72669029 z M 107.6907,50.463544 c -1.21818,0 -2.20485,0.98105 -2.20485,2.1923 v 77.443466 c 0,0.58094 0.23152,1.13993 0.64492,1.55107 0.41344,0.41098 0.97561,0.64129 1.55993,0.64129 h 22.39573 c 0.58428,0 1.14648,-0.23015 1.55993,-0.64129 0.41339,-0.41098 0.64491,-0.97008 0.64491,-1.55107 V 52.655844 c 0,-0.58094 -0.23151,-1.13993 -0.64491,-1.55101 -0.41344,-0.41098 -0.97561,-0.64129 -1.55993,-0.64129 z M 37.369863,76.590427 c -1.218174,0 -2.20485,0.98111 -2.20485,2.19236 v 51.316523 c 0,0.58099 0.231519,1.13998 0.644919,1.55107 0.413384,0.41098 0.97561,0.64129 1.559931,0.64129 h 22.39573 c 0.58428,0 1.14648,-0.23015 1.55993,-0.64129 0.41344,-0.41098 0.64492,-0.97008 0.64492,-1.55107 V 78.782787 c 0,-0.58094 -0.23152,-1.13998 -0.64492,-1.55107 -0.41339,-0.41098 -0.9756,-0.64129 -1.55993,-0.64129 z m 35.167301,13.685511 c -1.21818,0 -2.20484,0.9811 -2.20484,2.19236 v 37.631012 c 0,0.58094 0.23152,1.13993 0.64492,1.55107 0.41344,0.41098 0.97559,0.64129 1.55992,0.64129 h 22.384712 c 0.58427,0 1.14648,-0.23015 1.55993,-0.64129 0.41344,-0.41098 0.64492,-0.97008 0.64492,-1.55107 V 92.468298 c 0,-0.58094 -0.23152,-1.13998 -0.64492,-1.55107 -0.41338,-0.41098 -0.97561,-0.64129 -1.55993,-0.64129 z M 2.2053109,102.79405 c -1.21817311,0 -2.20484920008,0.9811 -2.20484920008,2.19236 v 25.1129 c 0,0.58094 0.23151802008,1.13998 0.64491806008,1.55107 0.41343804,0.41098 0.97561014,0.64129 1.55993114,0.64129 H 24.601044 c 0.584284,0 1.146472,-0.23015 1.559926,-0.64129 0.413437,-0.41098 0.644919,-0.97008 0.644919,-1.55107 v -25.1129 c 0,-0.58094 -0.231519,-1.13998 -0.644919,-1.55107 -0.413385,-0.41098 -0.9756,-0.64129 -1.559926,-0.64129 z" />
  </svg>
);

const AdminIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 117.32279 132.29167" className={className} fill="currentColor">
    <g transform="translate(-7.4844305)">
      <path d="M 66.154794,-2.9318908e-6 C 41.218752,-2.9318908e-6 20.927886,20.285035 20.927886,45.227015 v 4.191944 c 0,0.70292 4.84e-4,1.394667 0.05005,2.083945 -7.72243,1.772651 -13.4935051,8.675356 -13.4935051,16.932237 v 46.465649 c 0,9.60645 7.7868421,17.39088 17.3924931,17.39088 h 82.539436 c 9.60565,0 17.39088,-7.78572 17.39088,-17.39088 V 68.435141 c 0,-8.263065 -5.76446,-15.162814 -13.48689,-16.932237 h 0.0242 c 0.0339,-0.690763 0.0468,-1.383754 0.0468,-2.083945 V 45.227015 C 111.39139,20.291234 91.106173,-2.9318908e-6 66.16448,-2.9318908e-6 Z M 66.153341,15.481144 v 0 h 0.0015 c 16.408826,0 29.755738,13.348656 29.755738,29.752329 v 4.190701 c 0,0.547741 -0.0452,1.083858 -0.08234,1.625416 H 36.476548 c -0.03552,-0.535859 -0.08395,-1.083858 -0.08395,-1.625416 v -4.190701 c 0,-16.409372 13.349334,-29.75157 29.752025,-29.752329 z m 0,54.251508 c 6.874371,-1.61e-4 12.447195,5.572502 12.446872,12.447031 3.23e-4,3.259195 -1.278138,6.388914 -3.560608,8.715781 0.190825,0.739083 0.29221,1.514328 0.29221,2.314436 v 11.22007 c 0,5.08462 -4.093851,9.17815 -9.178474,9.17815 -5.084461,0 -9.177022,-4.09353 -9.177022,-9.17815 V 93.2099 c 0,-0.800108 0.09848,-1.575353 0.290758,-2.314436 -2.282309,-2.326867 -3.560608,-5.456586 -3.560608,-8.715781 0,-6.874529 5.572662,-12.447192 12.446872,-12.447031 z" />
    </g>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calendar');

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('smd_theme');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('smd_view');
    return saved ? JSON.parse(saved) : 'MONTH';
  });

  const [selectedMonthInYearView, setSelectedMonthInYearView] = useState<Date | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterModalidade, setFilterModalidade] = useState<string | 'all'>('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [items, setItems] = useState<CalendarItem[]>(() => {
    const saved = localStorage.getItem('smd_items');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => ({ ...item, date: parseISO(item.date) }));
    }
    return [];
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);
  const [selectedModalidade, setSelectedModalidade] = useState<string>('');

  useEffect(() => { 
    localStorage.setItem('smd_theme', JSON.stringify(darkMode)); 
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('smd_view', JSON.stringify(viewMode)); }, [viewMode]);
  
  useEffect(() => { 
    localStorage.setItem('smd_items', JSON.stringify(items.map(item => ({
      ...item, date: item.date.toISOString()
    })))); 
  }, [items]);

  const mondays = useMemo(() => {
    try {
      if (viewMode === 'YEAR' && selectedMonthInYearView) {
        return eachDayOfInterval({ 
          start: startOfMonth(selectedMonthInYearView), 
          end: endOfMonth(selectedMonthInYearView) 
        }).filter(date => isMonday(date));
      } else if (viewMode === 'MONTH') {
        const now = new Date();
        return eachDayOfInterval({ 
          start: startOfMonth(now), 
          end: endOfMonth(now) 
        }).filter(date => isMonday(date));
      } else if (viewMode === 'DAY') {
        const now = new Date();
        return [isMonday(now) ? now : nextMonday(now)];
      }
    } catch (e) { return []; }
    return [];
  }, [viewMode, selectedMonthInYearView]);

  const yearMonths = useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(currentDate),
      end: endOfYear(currentDate)
    });
  }, [currentDate]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesModalidade = filterModalidade === 'all' || item.modalidade === filterModalidade;
      
      return matchesSearch && matchesModalidade;
    }).sort((a, b) => compareAsc(a.date, b.date));
  }, [items, searchTerm, filterModalidade]);

  const sortedItems = filteredItems; // Mantendo compatibilidade com o resto do código

  const handleRemoveItem = (id: string) => {
    if (confirm('Deseja excluir este encontro?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const saveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemData = {
      title: formData.get('title') as string,
      date: selectedDate || new Date(),
      type: 'event' as ItemType,
      startTime: (formData.get('startTime') as string) || "",
      endTime: (formData.get('endTime') as string) || "",
      description: (formData.get('description') as string) || "",
      modalidade: formData.get('modalidade') as string,
      completed: editingItem ? editingItem.completed : false
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...itemData } : item));
    } else {
      setItems([...items, { id: crypto.randomUUID(), ...itemData }]);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const openAddModal = (date: Date = new Date(), item?: CalendarItem) => {
    setSelectedDate(item ? item.date : date);
    setEditingItem(item || null);
    setSelectedModalidade(item?.modalidade || '');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pb-24 md:pb-0 font-sans selection:bg-primary/20 transition-colors duration-300">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border transition-colors">
        <div className="max-w-5xl mx-auto px-2 md:px-6 h-16 flex items-center justify-center gap-3 md:gap-6">
          <h1 className="text-xl font-bold tracking-tight text-primary uppercase flex items-center flex-shrink-0">
            <CalendarHeaderIcon className="h-6 sm:h-7 w-auto" />
          </h1>
          <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto no-scrollbar">
            <div className="flex gap-1.5 lg:gap-2 bg-muted p-1 rounded-full flex-shrink-0">
                {(['DAY', 'MONTH', 'YEAR'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      if (mode === 'YEAR') setSelectedMonthInYearView(null);
                    }}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all",
                      viewMode === mode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mode === 'DAY' ? 'Semana' : mode === 'MONTH' ? 'Mês' : 'Ano'}
                  </button>
                ))}
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={cn(
                "w-[56px] h-[30px] shrink-0 rounded-full shadow-inner relative flex items-center px-[3px] transition-colors duration-500 overflow-hidden",
                darkMode ? "bg-muted border border-border/50" : "bg-[#e2e2e2]"
              )}
              style={{ boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)' }}
              title="Alternar Tema"
            >
              <div
                className={cn(
                  "w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all duration-300 transform",
                  darkMode ? "bg-[#121212] translate-x-[26px]" : "bg-white translate-x-0 shadow-md"
                )}
                style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
              >
                {darkMode ? (
                  <Moon strokeWidth={3} className="w-[14px] h-[14px] text-white" />
                ) : (
                  <Sun strokeWidth={3} className="w-[14px] h-[14px] text-[#09090B]" />
                )}
              </div>
            </button>

            <button 
              onClick={() => { 
                if (isAdmin) setIsAdmin(false);
                else {
                  setAdminPassword('');
                  setAuthError(false);
                  setIsAuthModalOpen(true);
                }
              }}
              className={cn(
                "w-[30px] h-[30px] rounded-full transition-transform flex items-center justify-center shrink-0 hover:scale-105 active:scale-95",
                isAdmin ? "text-primary shadow-sm" : "text-muted-foreground opacity-50 hover:opacity-100"
              )}
              title="Modo Administrador"
            >
              <AdminIcon className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-6 min-h-[calc(100vh-160px)]">
        
        {/* TAB 1: CALENDAR (HIG + Material 3) */}
        {activeTab === 'calendar' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {(viewMode === 'MONTH' || (viewMode === 'YEAR' && selectedMonthInYearView)) && (
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                  {viewMode === 'YEAR' && selectedMonthInYearView && (
                    <button 
                      onClick={() => setSelectedMonthInYearView(null)}
                      className="p-1 pr-2 transition-colors text-white hover:text-primary"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}
                  <h2 className="text-3xl font-black tracking-tight text-foreground uppercase font-display">
                    {format(viewMode === 'MONTH' ? new Date() : selectedMonthInYearView!, 'MMMM', { locale: ptBR })}
                  </h2>
                </div>
                {viewMode === 'YEAR' && selectedMonthInYearView && (
                   <span className={cn(
                     "text-sm font-bold text-muted-foreground uppercase tracking-widest px-3 py-1 rounded-full",
                     darkMode ? "bg-[#121212]" : "bg-muted"
                   )}>
                     {format(selectedMonthInYearView, 'yyyy')}
                   </span>
                )}
              </div>
            )}

            {viewMode === 'YEAR' && !selectedMonthInYearView && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {yearMonths.map((month) => {
                  const itemsInMonth = items.filter(i => 
                    i.date.getMonth() === month.getMonth() && 
                    i.date.getFullYear() === month.getFullYear()
                  );
                  const isCurrentMonth = isSameDay(startOfMonth(new Date()), startOfMonth(month));
                  
                  return (
                    <button
                      key={month.toISOString()}
                      onClick={() => setSelectedMonthInYearView(month)}
                      className={cn(
                        "p-6 rounded-3xl border transition-all text-left group relative overflow-hidden",
                        isCurrentMonth 
                          ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(0,255,0,0.1)]" 
                          : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-display font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {format(month, 'MMMM', { locale: ptBR })}
                        </h3>
                        <span className={cn(
                          "text-xs font-bold text-muted-foreground px-2 py-1 rounded-full",
                          darkMode ? "bg-[#121212]" : "bg-muted"
                        )}>
                          {format(month, 'yyyy')}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5">
                        {itemsInMonth.length > 0 ? (
                          itemsInMonth.slice(0, 3).map(item => (
                            <div key={item.id} className="flex items-center gap-2 text-xs text-muted-foreground truncate">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span className="font-bold text-foreground/70 shrink-0">{format(item.date, 'dd')}:</span>
                              <span className="truncate">{item.title}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-muted-foreground italic">Sem encontros</p>
                        )}
                        {itemsInMonth.length > 3 && (
                          <p className="text-[10px] text-primary font-bold mt-1">+ {itemsInMonth.length - 3} itens</p>
                        )}
                      </div>

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {(viewMode !== 'YEAR' || selectedMonthInYearView) && (
              <div className="space-y-8">
              {mondays.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">Nenhum evento neste período.</div>
              ) : (
                mondays.map((monday) => (
                  <div key={monday.toISOString()} className={cn(
                    "flex flex-col gap-6",
                    viewMode === 'DAY' ? "items-center text-center w-full" : "md:flex-row items-start"
                  )}>
                    <div className={cn(
                      "flex md:flex-col items-center gap-4 md:gap-1 shrink-0 mt-1",
                      viewMode === 'DAY' ? "justify-center" : "md:items-start md:w-28"
                    )}>
                      <div className="flex items-baseline">
                        {viewMode === 'DAY' ? (
                          <span className="text-5xl font-black tracking-tighter text-foreground font-display">
                            {format(monday, 'dd/MM')}
                          </span>
                        ) : (
                          <>
                            <span className="text-4xl font-black tracking-tighter text-foreground font-display">{format(monday, 'dd')}</span>
                            <span className="font-bold uppercase tracking-widest text-muted-foreground text-xs ml-0.5">
                              /{format(monday, 'MM')}
                            </span>
                          </>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="ml-auto md:ml-0 md:mt-4 flex items-center gap-1">
                          <button onClick={() => openAddModal(monday)} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <Plus className="w-5 h-5" />
                          </button>
                          <button type="button" aria-label="WhatsApp" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      {(() => {
                        const dayItems = items.filter(i => isSameDay(i.date, monday));
                        return dayItems.length === 0 ? (
                          <div className="p-6 rounded-2xl border border-dashed border-border text-xs uppercase tracking-widest text-muted-foreground font-bold text-center">
                            Livre
                          </div>
                        ) : (
                          dayItems.map(item => (
                            <div key={item.id} className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4">
                              <div className="flex-1">
                                {item.modalidade && (
                                  <p className={cn("text-sm italic mb-1", item.modalidade === 'Ponto Facultativo' ? 'text-orange-500' : item.modalidade === 'Feriado' ? 'text-red-500' : 'text-foreground')}>
                                    {item.modalidade}
                                    {['Ponto Facultativo', 'Feriado'].includes(item.modalidade) && ' (Sem Encontro)'}
                                  </p>
                                )}
                                <h4 className="text-base font-display font-semibold text-foreground tracking-wide">{item.title}</h4>
                                {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
                              </div>
                              <div className="flex items-center gap-3">
                                {(item.startTime || item.endTime) && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    {item.startTime}{item.startTime && item.endTime ? ' - ' : ''}{item.endTime}
                                  </div>
                                )}
                                {isAdmin && (
                                  <div className="flex items-center gap-0 border border-border/60 rounded-full p-0.5">
                                    <button onClick={() => openAddModal(item.date, item)} className="p-1.5 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <div className="w-[1px] h-4 bg-white opacity-25 mx-1"></div>
                                    <button onClick={() => handleRemoveItem(item.id)} className="p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                                      <Trash className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        );
                      })()}
                    </div>
                  </div>
                ))
              )}
            </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: LIST (Fluent 2 Style Scannable List) */}
        {activeTab === 'list' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            {/* Stats Header with Funnel */}
            <div className="relative flex items-center justify-center mb-8 mt-4">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold uppercase font-display tracking-[0.2em] text-foreground">
                  Estatísticas
                </h2>
                <div className="h-1 w-12 bg-primary rounded-full mt-2 shadow-[0_0_10px_rgba(0,255,0,0.5)]" />
              </div>
              
              <div className="absolute right-0">
                <button 
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className={cn(
                    "p-3 rounded-full transition-all duration-300",
                    isFilterMenuOpen 
                      ? "bg-primary text-white scale-110 shadow-[0_0_20px_rgba(0,255,0,0.5)]" 
                      : darkMode ? "bg-muted text-white hover:bg-muted/80" : "bg-[#E2E2E2] text-[#09090B] hover:bg-neutral-200"
                  )}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Collapsible Filter Menu */}
            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="bg-card border border-border rounded-3xl p-6 space-y-6 shadow-xl">
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Pesquisar</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Palavras, Título ou Descrição..."
                          className="w-full bg-muted border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Filtrar por Modalidade</label>
                      <div className="flex flex-wrap gap-2">
                        {['all', 'Abertura', 'O Livro dos Espíritos', 'Reforma Íntima', 'Especial', 'Prática', 'Expoente Espírita', 'Encerramento', 'Feriado', 'Ponto Facultativo'].map(m => (
                          <button
                            key={m}
                            onClick={() => setFilterModalidade(m)}
                            className={cn(
                              "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                              filterModalidade === m
                                ? "bg-primary text-white border-primary shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                                : "bg-transparent text-muted-foreground border-border hover:border-muted-foreground/30"
                            )}
                          >
                            {m === 'all' ? 'Todos' : m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {sortedItems.length > 0 && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                {sortedItems.map((item, index) => (
                  <div key={item.id} className={cn("p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-accent/50 transition-colors", index !== sortedItems.length - 1 && "border-b border-border")}>
                    <div className="w-24 shrink-0">
                      <div className="text-sm font-semibold">{format(item.date, 'dd/MM/yyyy')}</div>
                      <div className="text-xs text-muted-foreground uppercase">{format(item.date, 'EEEE', { locale: ptBR })}</div>
                    </div>
                    <div className="flex-1">
                      {item.modalidade && (
                        <div className={cn("text-xs italic mb-0.5", item.modalidade === 'Ponto Facultativo' ? 'text-orange-500' : item.modalidade === 'Feriado' ? 'text-red-500' : 'text-foreground')}>
                          {item.modalidade}
                          {['Ponto Facultativo', 'Feriado'].includes(item.modalidade) && ' (Sem Encontro)'}
                        </div>
                      )}
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      {item.description && <div className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{item.description}</div>}
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      {item.startTime && (
                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded-md">{item.startTime}</span>
                      )}
                      {isAdmin && (
                        <div className="flex items-center gap-0 shrink-0 border border-border/60 rounded-full p-0.5">
                          <button onClick={() => openAddModal(item.date, item)} className="p-1.5 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <div className="w-[1px] h-4 bg-white opacity-25 mx-1"></div>
                          <button onClick={() => handleRemoveItem(item.id)} className="p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Configurações removidas e movidas para Menu FAB */}
      </main>

      {/* HIG / Apple Style Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel md:bottom-6 md:w-fit md:mx-auto md:rounded-3xl z-40 px-2 pb-[env(safe-area-inset-bottom)] md:pb-0 pt-2 pb-2">
        <div className="flex items-center justify-around md:gap-2 w-full min-w-[320px]">
          {(['calendar', 'list'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 md:flex-none md:w-24 flex items-center justify-center py-3 px-4 rounded-xl transition-all",
                activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tab === 'calendar' && <CalendarCustomIcon className="w-7 h-7" />}
              {tab === 'list' && <FunnelCustomIcon className="w-7 h-7" />}
            </button>
          ))}
        </div>
      </div>

      {/* Material 3 Bottom Sheet / Modal for Adding Event */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => { setIsModalOpen(false); setEditingItem(null); }} 
              className="absolute inset-0 bottom-sheet-overlay pointer-events-auto" 
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-md bg-background sm:rounded-[2rem] rounded-t-[2rem] shadow-2xl relative z-10 pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-background z-20 pt-5 pb-3 px-6 flex items-center justify-center border-b border-border">
                <div className="w-12 h-1.5 bg-muted rounded-full absolute top-2 left-1/2 -translate-x-1/2 sm:hidden" />
                <h2 className="text-lg font-bold uppercase text-[#00cc00]">{editingItem ? 'Editar Encontro' : 'Adicionar Encontro'}</h2>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="p-2 bg-muted hover:bg-muted-foreground/20 rounded-full transition-colors absolute right-4">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form key={editingItem?.id || 'new'} onSubmit={saveItem} className="p-5 space-y-4">
                <div className="space-y-1">
                  <label className="block text-center text-sm font-medium text-foreground">Modalidade</label>
                  <div className="relative">
                    <select 
                      name="modalidade" 
                      defaultValue={editingItem?.modalidade || ""}
                      onChange={(e) => setSelectedModalidade(e.target.value)}
                      required
                      className="w-full p-2.5 text-center flex justify-center rounded-xl bg-transparent border border-border focus:border-primary outline-none transition-all appearance-none cursor-pointer invalid:text-sm invalid:italic invalid:text-muted-foreground/70"
                      style={{ textAlignLast: 'center' }}
                    >
                      <option value="" disabled hidden>Selecionar</option>
                      <option value="Abertura" className="bg-card text-foreground italic text-base">Abertura</option>
                      <option value="O Livro dos Espíritos" className="bg-card text-foreground italic text-base">O Livro dos Espíritos</option>
                      <option value="Reforma Íntima" className="bg-card text-foreground italic text-base">Reforma Íntima</option>
                      <option value="Especial" className="bg-card text-foreground italic text-base">Especial</option>
                      <option value="Prática" className="bg-card text-foreground italic text-base">Prática</option>
                      <option value="Expoente Espírita" className="bg-card text-foreground italic text-base">Expoente Espírita</option>
                      <option value="Encerramento" className="bg-card text-foreground italic text-base">Encerramento</option>
                      <option value="Ponto Facultativo" className="bg-card text-orange-500 italic text-base">Ponto Facultativo</option>
                      <option value="Feriado" className="bg-card text-red-500 italic text-base">Feriado</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-foreground/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-center text-sm font-medium text-foreground">
                    {['Ponto Facultativo', 'Feriado'].includes(selectedModalidade) ? 'Tipo' : 'Tema'}
                  </label>
                  <input name="title" defaultValue={editingItem?.title || ""} required className="w-full p-2.5 text-center rounded-xl bg-transparent border border-border focus:border-primary outline-none transition-all" />
                </div>
                
                {!['Ponto Facultativo', 'Feriado'].includes(selectedModalidade) && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-center text-sm font-medium text-foreground">Início</label>
                        <input name="startTime" type="time" defaultValue={editingItem?.startTime || "00:00"} className="w-full p-2.5 text-center rounded-xl bg-transparent border border-border focus:border-primary outline-none transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-center text-sm font-medium text-foreground">Término</label>
                        <input name="endTime" type="time" defaultValue={editingItem?.endTime || "00:00"} className="w-full p-2.5 text-center rounded-xl bg-transparent border border-border focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex-1 flex flex-col space-y-1">
                        <label className="block text-center text-sm font-medium text-foreground">Chamada</label>
                        <textarea name="description" defaultValue={editingItem?.description || ""} rows={2} className="flex-1 w-full p-2.5 text-center rounded-xl bg-transparent border border-border focus:border-primary outline-none transition-all resize-none" />
                      </div>
                      
                      <div className="w-14 shrink-0 flex flex-col space-y-1">
                        <label className="block text-center text-sm font-medium text-foreground">Capa</label>
                        <button type="button" aria-label="Upload" className="flex-1 w-full rounded-xl bg-transparent border border-border flex items-center justify-center hover:bg-muted transition-colors text-[#00cc00] hover:opacity-80">
                          <Upload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="pt-1 flex justify-center">
                  <button type="submit" className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity uppercase text-sm">
                    {editingItem ? 'Alterar' : 'Implementar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Auth Modal (Custom In-App Password Area) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[300px] bg-card border border-border p-6 pt-10 rounded-[40px] shadow-2xl text-center"
            >
              {/* Back Button */}
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className={cn(
                  "absolute top-6 left-6 p-1 transition-colors hover:text-primary",
                  darkMode ? "text-white" : "text-[#09090B]"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-primary mb-5 flex justify-center">
                <AdminIcon className="w-9 h-9" />
              </div>
              <h2 className="text-xl font-display font-bold uppercase tracking-widest text-foreground mb-6">Área Administrativa</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    placeholder=""
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAuthError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (adminPassword === 'ADMSemeadores*') {
                          setIsAdmin(true);
                          setIsAuthModalOpen(false);
                        } else {
                          setAuthError(true);
                        }
                      }
                    }}
                    className={cn(
                      "w-full bg-muted border rounded-2xl px-4 py-4 text-center text-lg tracking-widest focus:outline-none transition-all",
                      authError ? "border-destructive ring-1 ring-destructive" : "border-border focus:border-primary/50"
                    )}
                  />
                  {authError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive font-bold mt-2 uppercase tracking-tighter"
                    >
                      Senha Incorreta! Tente novamente.
                    </motion.p>
                  )}
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      if (adminPassword === 'ADMSemeadores*') {
                        setIsAdmin(true);
                        setIsAuthModalOpen(false);
                      } else {
                        setAuthError(true);
                      }
                    }}
                    className="w-full bg-primary text-white font-display font-bold uppercase py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
