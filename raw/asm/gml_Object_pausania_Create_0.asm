// gml_Object_pausania_Create_0  locals=3 args=0 len=168
// locals: arguments, width, height
00000000: push.builtin.v application_surface
00000008: call surface_get_width(argc=1)
00000010: pop.v.v local.width
00000018: push.builtin.v application_surface
00000020: call surface_get_height(argc=1)
00000028: pop.v.v local.height
00000030: push.imm.e 0
00000034: pop.v.i spr1
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.local.v local.height
00000064: push.local.v local.width
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.builtin.v application_surface
00000084: call sprite_create_from_surface(argc=9)
0000008C: pop.v.v spr1
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: call instance_deactivate_all(argc=1)
000000A4: popz