// gml_Object_industria2_Alarm_4  locals=2 args=0 len=484
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 4
00000018: conv.i.v
0000001C: push.imm.e 20
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x20EBD68
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.v oil
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20EBD68
00000070: b 0x20EBD70
00000074: popenv 0x40EBD2C
00000078: b 0x20EBD74
0000007C: popenv 0x1CEBD70
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20EBEC4
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.v deming
000000A8: call action_if_variable(argc=3)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20EBEC4
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: push.v xi
000000E0: call action_if_variable(argc=3)
000000E8: pop.v.v local.__b__
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x20EBE40
00000100: push.imm.e 1
00000104: conv.i.v
00000108: call action_set_relative(argc=1)
00000110: popz
00000114: push.imm.e -111
00000118: conv.i.v
0000011C: push.imm.e -20
00000120: conv.i.v
00000124: push.imm.e 705
00000128: conv.i.v
0000012C: call action_create_object(argc=3)
00000134: popz
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: push.imm.e 2
00000158: conv.i.v
0000015C: push.v xi
00000164: call action_if_variable(argc=3)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x20EBEC4
00000184: push.imm.e 1
00000188: conv.i.v
0000018C: call action_set_relative(argc=1)
00000194: popz
00000198: push.imm.e -151
0000019C: conv.i.v
000001A0: push.imm.e -53
000001A4: conv.i.v
000001A8: push.imm.e 705
000001AC: conv.i.v
000001B0: call action_create_object(argc=3)
000001B8: popz
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: call action_set_relative(argc=1)
000001CC: popz
000001D0: push.imm.e 0
000001D4: conv.i.v
000001D8: call action_set_relative(argc=1)
000001E0: popz