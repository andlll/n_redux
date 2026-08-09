// gml_Object_lampla_Create_0  locals=1 args=0 len=76
// locals: arguments
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 1
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 0
00000020: pop.v.i trans
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 654
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz