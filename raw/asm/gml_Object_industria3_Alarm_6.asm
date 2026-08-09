// gml_Object_industria3_Alarm_6  locals=2 args=0 len=344
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 6
00000018: conv.i.v
0000001C: push.imm.e 57
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x20ECE00
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 1
00000044: conv.i.v
00000048: push.v storm
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20ECE00
00000070: b 0x20ECE08
00000074: popenv 0x40ECDC4
00000078: b 0x20ECE0C
0000007C: popenv 0x1CECE08
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20ECED0
00000090: push.imm.e 100
00000094: conv.i.v
00000098: call action_if_dice(argc=1)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20ECED0
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: call action_set_relative(argc=1)
000000C8: popz
000000CC: push.imm.e -140
000000D0: conv.i.v
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 444
000000E0: conv.i.v
000000E4: call action_create_object(argc=3)
000000EC: popz
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.v life
00000120: push.imm.e -50
00000124: add.i.v
00000128: pop.v.v life
00000130: push.imm.e 0
00000134: conv.i.v
00000138: call action_set_relative(argc=1)
00000140: popz
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: call action_set_relative(argc=1)
00000154: popz