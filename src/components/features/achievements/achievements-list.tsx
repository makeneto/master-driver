import { motion } from "framer-motion"
import { useAppSelector } from "@/store/hooks"
import { useTranslation } from "@/hooks/use-translation"
import AchievementsCard from "./achievements-card"

export default function AchievementsList() {
  const achievements = useAppSelector((s) => s.achievements.items)
  const list = Object.values(achievements)
  const { achievementText } = useTranslation()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {list.map((achievement, i) => {
        const { title, description } = achievementText(achievement.id)

        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <AchievementsCard
              achievement={achievement}
              title={title}
              description={description}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
