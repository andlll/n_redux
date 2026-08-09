// gml_Object_d441_Create_0  locals=1 args=0 len=96
// locals: arguments
00000000: push.imm.e 0
00000004: pop.v.i bout
0000000C: push.imm.e 0
00000010: pop.v.i trans
00000018: push.v y
00000020: neg.v.d
00000024: push.d 2.9
00000030: add.d.v
00000034: pop.v.v depth
0000003C: push.imm.e 1
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 654
00000050: conv.i.v
00000054: call action_sprite_set(argc=3)
0000005C: popz