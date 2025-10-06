import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params as any;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(post);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params as any;
  const body = await req.json();
  const { title, content, image } = body;
  const updated = await prisma.post.update({
    where: { id },
    data: { title, content, image },
  });
  return Response.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params as any;
  await prisma.post.delete({ where: { id } });
  return new Response(null, { status: 204 });
}


