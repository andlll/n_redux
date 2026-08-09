// gml_Object_stella3_Mouse_11  locals=2 args=0 len=408
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v unlocinque
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21DFF10
00000038: push.imm.e 156
0000003C: pushenv 0x21DFE9C
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 7
0000004C: conv.i.v
00000050: push.v selec
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x21DFE9C
00000078: b 0x21DFEA4
0000007C: popenv 0x41DFE60
00000080: b 0x21DFEA8
00000084: popenv 0x1DDFEA4
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x21DFEE0
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 467
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: b 0x21DFF04
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.imm.e 466
000000D4: conv.i.v
000000D8: call action_sprite_set(argc=3)
000000E0: popz
000000E4: push.imm.e 0
000000E8: pop.v.i over
000000F0: push.imm.e 147
000000F4: pushenv 0x21DFF24
000000F8: call action_kill_object(argc=0)
00000100: popz
00000104: popenv 0x41DFF18
00000108: push.imm.e 146
0000010C: pushenv 0x21DFF3C
00000110: call action_kill_object(argc=0)
00000118: popz
0000011C: popenv 0x41DFF30
00000120: push.imm.e 679
00000124: pushenv 0x21DFF54
00000128: call action_kill_object(argc=0)
00000130: popz
00000134: popenv 0x41DFF48
00000138: push.imm.e 654
0000013C: pushenv 0x21DFF6C
00000140: call action_kill_object(argc=0)
00000148: popz
0000014C: popenv 0x41DFF60
00000150: push.imm.e 669
00000154: pushenv 0x21DFF84
00000158: call action_kill_object(argc=0)
00000160: popz
00000164: popenv 0x41DFF78
00000168: push.imm.e 675
0000016C: pushenv 0x21DFF9C
00000170: call action_kill_object(argc=0)
00000178: popz
0000017C: popenv 0x41DFF90
00000180: push.imm.e 676
00000184: pushenv 0x21DFFB4
00000188: call action_kill_object(argc=0)
00000190: popz
00000194: popenv 0x41DFFA8