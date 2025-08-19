import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import profileImage from '@/assets/profile.jpg'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const Home = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [2, 3, 4, 5, 6, 7, 8],
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: [3, 5, 6, 8, 10, 12, 7],
        borderColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Dataset 3',
        data: [2, 1, 7, 6, 3, 4, 3],
        borderColor: 'rgb(53, 162, 123)',
      },
    ],
  }

  const recentActivities = ['블로그 정리', '데일리 미션', '팀 스터디']

  const stats = [
    { label: '만든 어플리케이션', value: '5' },
    { label: '스터디 활동 횟수', value: '2' },
    { label: '와와와와', value: '3' },
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* 프로필 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-2">
          <img src={profileImage} className="w-24 h-24 rounded-full" alt="프로필 이미지" />
          <p className="text-lg font-semibold">박총명</p>
          <p className="text-sm text-gray-500">Frontend 개발자</p>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {recentActivities.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 통계 / 대시보드 */}
      <Card>
        <CardHeader>
          <CardTitle>통계</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <Line options={options} data={data} />
      </Card>
    </div>
  )
}

export default Home
