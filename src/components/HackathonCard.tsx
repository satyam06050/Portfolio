import dynamicIconImports from "lucide-react/dynamicIconImports";
import Link from "next/link";
import Markdown from "react-markdown";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import Icon from "./Icon";
import ImageWithSkeleton from "./ImageWithSkeleton";

type HackathonLink = {
  href: string;
  icon: string;
  name: string;
};

type HackathonCardProps = {
  title: string;
  hackathon: string;
  description: string;
  image: string;
  date?: string;
  team?: number;
  duration?: string;
  tech?: string[];
  github?: string;
  devpost?: string;
  certificate?: string;
  tags?: string[];
  links?: HackathonLink[];
};

interface Props {
  hackathon: HackathonCardProps;
}

export function HackathonCard({ hackathon }: Props) {
  const {
    title,
    hackathon: event,
    description,
    image,
    date,
    tags,
    links,
  } = hackathon;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        {image && (
          <ImageWithSkeleton
            src={image}
            alt={title}
            width={500}
            height={300}
            quality={100}
            sizes="(max-width: 640px) 100vw, 500px"
            containerClassName="aspect-[5/3] w-full overflow-hidden rounded-lg bg-muted"
            className="h-full w-full object-contain"
          />
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <CardTitle>{title}</CardTitle>

        <p className="text-xs text-muted-foreground">
          {event}
          {date && <> · {date}</>}
        </p>

        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
          {description}
        </Markdown>
      </CardContent>

      <CardFooter className="flex h-full flex-col items-start justify-between gap-4">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="px-1 py-0 text-[10px]"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links
              .toSorted((a, b) => a.name.localeCompare(b.name))
              .map((link, idx) => {
                const iconName = link.icon as keyof typeof dynamicIconImports;
                if (!(iconName in dynamicIconImports)) {
                  console.warn(`Unknown icon "${link.icon}" for link "${link.name}"`);
                }
                return (
                  <Link href={link.href} key={idx} target="_blank">
                    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                      <Icon name={iconName} className="size-3" />
                      {link.name}
                    </Badge>
                  </Link>
                );
              })}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}