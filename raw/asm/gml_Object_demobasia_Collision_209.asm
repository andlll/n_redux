// gml_Object_demobasia_Collision_209  locals=2 args=0 len=356
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
00000048: bf 0x20BCBF8
0000004C: push.imm.e 156
00000050: pushenv 0x20BCB3C
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.i 100000
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20BCB3C
00000090: b 0x20BCB44
00000094: popenv 0x40BCAFC
00000098: b 0x20BCB48
0000009C: popenv 0x1CBCB44
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BCBF8
000000B0: push.imm.e 156
000000B4: pushenv 0x20BCB7C
000000B8: push.v mon
000000C0: push.i -100000
000000C8: add.i.v
000000CC: pop.v.v mon
000000D4: popenv 0x40BCB60
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 588
000000EC: conv.i.v
000000F0: call action_create_object(argc=3)
000000F8: popz
000000FC: push.imm.e 128
00000100: pushenv 0x20BCBB8
00000104: call action_kill_object(argc=0)
0000010C: popz
00000110: popenv 0x40BCBAC
00000114: push.imm.e 130
00000118: pushenv 0x20BCBD0
0000011C: call action_kill_object(argc=0)
00000124: popz
00000128: popenv 0x40BCBC4
0000012C: push.imm.e 129
00000130: pushenv 0x20BCBE8
00000134: call action_kill_object(argc=0)
0000013C: popz
00000140: popenv 0x40BCBDC
00000144: call action_kill_object(argc=0)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz