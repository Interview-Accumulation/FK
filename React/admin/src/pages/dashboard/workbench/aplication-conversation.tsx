import { Iconify } from "@/components/icon";
import { Progress } from "antd";
import { useThemeToken } from "@/theme/hooks";

type Props = {
    percent: number;
    title: string;
    subtitle: string;
    iconify: string;
    bg?: string;
    strokeColor?: string;
  };
  function Basic({ percent, title, subtitle, iconify, bg, strokeColor }: Props) {
    const { colorBgBase } = useThemeToken();
    const format = (val?: number) => <span style={{ color: colorBgBase }}>{val}%</span>;
    return (
      <div
        className="relative flex items-center rounded-2xl p-6"
        style={{ background: bg, color: colorBgBase }}
      >
        <Progress
          type="circle"
          size={70}
          percent={percent}
          format={format}
          strokeColor={strokeColor}
        />
        <div className="ml-2 flex flex-col">
          <span className="text-2xl font-bold">{title}</span>
          <span className="opacity-50">{subtitle}</span>
        </div>
        <div className="absolute right-0">
          <Iconify icon={iconify} style={{ opacity: 0.08 }} size={100} />
        </div>
      </div>
    );
  }

  export function Conversation() {
    const { colorInfoActive } = useThemeToken();
    return (
        <Basic
            percent={80}
            title="80"
            subtitle="Conversation"
            iconify="bx:bxs-message-alt-detail"
            bg={colorInfoActive}
            strokeColor="#FF7875"
        />
    )
  }

  export function Application() {
    const { colorInfoActive } = useThemeToken();
    return (
        <Basic
            percent={60}
            title="60"
            subtitle="Application"
            iconify="bx:bxs-pen"
            bg={colorInfoActive}
            strokeColor="#FFD666"
        />
    )
  }
  