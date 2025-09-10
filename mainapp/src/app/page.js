
import Welcome from "./welcome";


export const metadata = {
  title: "MindSpace",
  description: "Your Mental Health Companion",
  icons: {
    icon: "/webbg.png",
  },
};

export default function Home() {
  return <Welcome />;
}