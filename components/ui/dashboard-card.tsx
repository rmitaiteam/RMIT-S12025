import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  onClick,
}) => {
  return (
    <Tooltip content={subtitle}>
      <Card
        className="drop-shadow-md bg-stone-900 hover:bg-neutral-900 grid grid-cols-1 gap-4 justify-items-start"
        isPressable
        onClick={onClick}
      >
        <CardHeader className="pt-2 px-4 flex-col items-start justify-between">
          <h4 className="font-medium text-xl pt-2 pb-4 align-left">{title}</h4>
          <div className="justify-items-start"></div>
        </CardHeader>
        <CardBody className="pb-4 overflow-visible">
          <Image
            alt="Card background"
            className="rounded-xl object-cover absolute overflow-visible bottom-2 right-1 h-20 w-20"
            src={image}
            width={250} // Increase width
            height={190} // Increase height
          />
        </CardBody>
      </Card>
    </Tooltip>
  );
};

export default DashboardCard;
