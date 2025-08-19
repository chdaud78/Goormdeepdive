import { Github, BookOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

const ProfileCard = ({ name, profile, intro, GitHub, blog }) => (
  <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-center">{name}</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col items-center space-y-4">
      <img
        className="w-35 h-35 rounded-full border-2 border-gray-200 object-cover"
        src={profile}
        alt="profile"
      />
      <p className="text-gray-600 text-center">{intro}</p>
    </CardContent>

    {(GitHub || blog) && (
      <CardFooter className="flex justify-center space-x-4">
        {GitHub && (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={GitHub} target="_blank" rel="noreferrer">
              <Github size={16} /> Github
            </a>
          </Button>
        )}
        {blog && (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={blog} target="_blank" rel="noreferrer">
              <BookOpen size={16} /> Blog
            </a>
          </Button>
        )}
      </CardFooter>
    )}
  </Card>
)

export default ProfileCard
