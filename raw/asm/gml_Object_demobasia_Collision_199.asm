// gml_Object_demobasia_Collision_199  locals=2 args=0 len=356
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
00000048: bf 0x20BDAC8
0000004C: push.imm.e 156
00000050: pushenv 0x20BDA0C
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.i 50000
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20BDA0C
00000090: b 0x20BDA14
00000094: popenv 0x40BD9CC
00000098: b 0x20BDA18
0000009C: popenv 0x1CBDA14
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BDAC8
000000B0: push.imm.e 156
000000B4: pushenv 0x20BDA4C
000000B8: push.v mon
000000C0: push.i -50000
000000C8: add.i.v
000000CC: pop.v.v mon
000000D4: popenv 0x40BDA30
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 563
000000EC: conv.i.v
000000F0: call action_create_object(argc=3)
000000F8: popz
000000FC: push.imm.e 128
00000100: pushenv 0x20BDA88
00000104: call action_kill_object(argc=0)
0000010C: popz
00000110: popenv 0x40BDA7C
00000114: push.imm.e 130
00000118: pushenv 0x20BDAA0
0000011C: call action_kill_object(argc=0)
00000124: popz
00000128: popenv 0x40BDA94
0000012C: push.imm.e 129
00000130: pushenv 0x20BDAB8
00000134: call action_kill_object(argc=0)
0000013C: popz
00000140: popenv 0x40BDAAC
00000144: call action_kill_object(argc=0)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz