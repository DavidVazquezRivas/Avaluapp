import { Media } from '@/models/media.model'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LanguageIcon from '@mui/icons-material/Language'

export const socialMedias: Media[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/DavidVazquezRivas/Avaluapp',
    icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/davidvazquezrivas/',
    icon: LinkedInIcon,
  },
  {
    name: 'Website',
    link: 'https://www.uib.cat/',
    icon: LanguageIcon,
  },
]
