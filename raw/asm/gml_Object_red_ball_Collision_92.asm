// gml_Object_red_ball_Collision_92  locals=2 args=0 len=352
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v other.id
0000001C: conv.v.i
00000020: pushenv 0x2110BA4
00000024: push.v life
0000002C: push.imm.e -1
00000030: add.i.v
00000034: pop.v.v life
0000003C: popenv 0x4110B8C
00000040: push.v other.id
00000048: conv.v.i
0000004C: pushenv 0x2110BE0
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 1
0000005C: conv.i.v
00000060: push.v desto
00000068: call action_if_variable(argc=3)
00000070: pop.v.v local.__b__
00000078: popenv 0x4110BB8
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x2110C24
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
000000BC: push.v other.id
000000C4: conv.v.i
000000C8: pushenv 0x2110C5C
000000CC: push.imm.e 3
000000D0: conv.i.v
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.v life
000000E4: call action_if_variable(argc=3)
000000EC: pop.v.v local.__b__
000000F4: popenv 0x4110C34
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x2110CB4
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 0
00000114: conv.i.v
00000118: push.imm.e 606
0000011C: conv.i.v
00000120: call action_create_object(argc=3)
00000128: popz
0000012C: push.v other.id
00000134: conv.v.i
00000138: pushenv 0x2110CB0
0000013C: call action_kill_object(argc=0)
00000144: popz
00000148: popenv 0x4110CA4
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: call action_set_relative(argc=1)
0000015C: popz