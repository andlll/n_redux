// gml_Object_demobasia_Collision_188  locals=2 args=0 len=348
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v iessa
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20BE5F4
0000004C: push.imm.e 156
00000050: pushenv 0x20BE53C
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.imm.e 6000
00000060: conv.i.v
00000064: push.v mon
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20BE53C
0000008C: b 0x20BE544
00000090: popenv 0x40BE500
00000094: b 0x20BE548
00000098: popenv 0x1CBE544
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20BE5F4
000000AC: push.imm.e 156
000000B0: pushenv 0x20BE578
000000B4: push.v mon
000000BC: push.imm.e -6000
000000C0: add.i.v
000000C4: pop.v.v mon
000000CC: popenv 0x40BE560
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 572
000000E4: conv.i.v
000000E8: call action_create_object(argc=3)
000000F0: popz
000000F4: push.imm.e 128
000000F8: pushenv 0x20BE5B4
000000FC: call action_kill_object(argc=0)
00000104: popz
00000108: popenv 0x40BE5A8
0000010C: push.imm.e 130
00000110: pushenv 0x20BE5CC
00000114: call action_kill_object(argc=0)
0000011C: popz
00000120: popenv 0x40BE5C0
00000124: push.imm.e 129
00000128: pushenv 0x20BE5E4
0000012C: call action_kill_object(argc=0)
00000134: popz
00000138: popenv 0x40BE5D8
0000013C: call action_kill_object(argc=0)
00000144: popz
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: call action_set_relative(argc=1)
00000158: popz