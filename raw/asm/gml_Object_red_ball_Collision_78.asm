// gml_Object_red_ball_Collision_78  locals=2 args=0 len=208
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x2110E98
00000024: push.v life
0000002C: push.imm.e -1
00000030: add.i.v
00000034: pop.v.v life
0000003C: popenv 0x4110E80
00000040: push.v other.id
00000048: conv.v.i
0000004C: pushenv 0x2110ED4
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 1
0000005C: conv.i.v
00000060: push.v desto
00000068: call action_if_variable(argc=3)
00000070: pop.v.v local.__b__
00000078: popenv 0x4110EAC
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x2110F18
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 606
000000A0: conv.i.v
000000A4: call action_create_object(argc=3)
000000AC: popz
000000B0: call action_kill_object(argc=0)
000000B8: popz
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: call action_set_relative(argc=1)
000000CC: popz