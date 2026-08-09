// gml_Object_red_ball_Collision_91  locals=2 args=0 len=196
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x2110D14
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: push.v desto
0000003C: call action_if_variable(argc=3)
00000044: pop.v.v local.__b__
0000004C: popenv 0x4110CEC
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2110D78
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 606
00000074: conv.i.v
00000078: call action_create_object(argc=3)
00000080: popz
00000084: push.v other.id
0000008C: conv.v.i
00000090: pushenv 0x2110D68
00000094: call action_kill_object(argc=0)
0000009C: popz
000000A0: popenv 0x4110D5C
000000A4: call action_kill_object(argc=0)
000000AC: popz
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz