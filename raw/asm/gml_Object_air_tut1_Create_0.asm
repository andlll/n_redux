// gml_Object_air_tut1_Create_0  locals=2 args=0 len=96
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x209BF64
00000028: push.imm.e 4
0000002C: pop.v.i sprite_index
00000034: push.imm.e 3
00000038: conv.i.v
0000003C: push.imm.e 1
00000040: conv.i.v
00000044: call irandom_range(argc=2)
0000004C: push.imm.e 30
00000050: conv.i.v
00000054: call action_set_motion(argc=2)
0000005C: popz