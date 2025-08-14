import profileImage from "@/assets/profile.jpg"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx"

const Main = () => (
  <div className="container">
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={profileImage} className="w-50" alt="프로필 이미지" />
        <p>박총명</p>
      </CardContent>
    </Card>
  </div>
)

export default Main
