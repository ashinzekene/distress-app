export class Distress {
  _id: string;
  title: string;
  description: string;
  author: string;
  location: { name: string, points?: number[] };
  ip: string;
  category: string;
  tags: string[];
  approves: string[];
  comments: string[];
  dispproves: string[];
  witnesses: string[];
  image: string;
}
