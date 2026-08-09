// gml_Object_laserone_Collision_77  locals=2 args=0 len=336
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v nocivo
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x210F0E4
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x210F0AC
0000005C: push.v life
00000064: push.imm.e -2
00000068: add.i.v
0000006C: pop.v.v life
00000074: popenv 0x410F094
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: call action_set_relative(argc=1)
00000088: popz
0000008C: push.imm.e 0
00000090: pop.v.i nocivo
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.v other.id
000000B4: conv.v.i
000000B8: pushenv 0x210F11C
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.imm.e 1
000000C8: conv.i.v
000000CC: push.v desto
000000D4: call action_if_variable(argc=3)
000000DC: pop.v.v local.__b__
000000E4: popenv 0x410F0F4
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x210F174
000000F8: push.v other.id
00000100: conv.v.i
00000104: pushenv 0x210F164
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 0
00000114: conv.i.v
00000118: push.imm.e 606
0000011C: conv.i.v
00000120: call action_create_object(argc=3)
00000128: popz
0000012C: popenv 0x410F140
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: call action_set_relative(argc=1)
0000014C: popz