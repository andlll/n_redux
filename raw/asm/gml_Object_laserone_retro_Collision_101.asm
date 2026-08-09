// gml_Object_laserone_retro_Collision_101  locals=2 args=0 len=256
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x210F364
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: push.v desto
0000003C: call action_if_variable(argc=3)
00000044: pop.v.v local.__b__
0000004C: popenv 0x410F33C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x210F404
00000060: push.imm.e 1
00000064: pop.v.i dat
0000006C: push.v other.id
00000074: conv.v.i
00000078: pushenv 0x210F3E0
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: call action_set_relative(argc=1)
0000008C: popz
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.imm.e 606
000000A4: conv.i.v
000000A8: call action_create_object(argc=3)
000000B0: popz
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: call action_set_relative(argc=1)
000000C4: popz
000000C8: popenv 0x410F394
000000CC: push.v other.id
000000D4: conv.v.i
000000D8: pushenv 0x210F400
000000DC: call action_kill_object(argc=0)
000000E4: popz
000000E8: popenv 0x410F3F4
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: call action_set_relative(argc=1)
000000FC: popz