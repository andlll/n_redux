// gml_Object_villa1_Alarm_2  locals=2 args=0 len=636
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.v ava
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20D2F80
0000004C: push.v ava
00000054: push.imm.e 1
00000058: add.i.v
0000005C: pop.v.v ava
00000064: push.imm.e 4
00000068: conv.i.v
0000006C: call action_if_dice(argc=1)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20D2DC8
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 469
000000A0: conv.i.v
000000A4: call action_create_object(argc=3)
000000AC: popz
000000B0: push.imm.e 156
000000B4: pushenv 0x20D2DE8
000000B8: push.v pop
000000C0: push.imm.e 2
000000C4: add.i.v
000000C8: pop.v.v pop
000000D0: popenv 0x40D2DD0
000000D4: push.imm.e 2
000000D8: conv.i.v
000000DC: call action_if_dice(argc=1)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20D2ECC
000000FC: push.imm.e 2
00000100: conv.i.v
00000104: call action_if_dice(argc=1)
0000010C: pop.v.v local.__b__
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x20D2E84
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: call action_set_relative(argc=1)
00000134: popz
00000138: push.imm.e 2
0000013C: conv.i.v
00000140: push.imm.e 3500
00000144: conv.i.v
00000148: call action_set_alarm(argc=2)
00000150: popz
00000154: push.imm.e 1
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: b 0x20D2EC8
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: call action_set_relative(argc=1)
0000017C: popz
00000180: push.imm.e 2
00000184: conv.i.v
00000188: push.imm.e 5796
0000018C: conv.i.v
00000190: call action_set_alarm(argc=2)
00000198: popz
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz
000001B0: b 0x20D2F80
000001B4: push.imm.e 2
000001B8: conv.i.v
000001BC: call action_if_dice(argc=1)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x20D2F3C
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: call action_set_relative(argc=1)
000001EC: popz
000001F0: push.imm.e 2
000001F4: conv.i.v
000001F8: push.imm.e 11565
000001FC: conv.i.v
00000200: call action_set_alarm(argc=2)
00000208: popz
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: call action_set_relative(argc=1)
0000021C: popz
00000220: b 0x20D2F80
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: call action_set_relative(argc=1)
00000234: popz
00000238: push.imm.e 2
0000023C: conv.i.v
00000240: push.imm.e 14656
00000244: conv.i.v
00000248: call action_set_alarm(argc=2)
00000250: popz
00000254: push.imm.e 1
00000258: conv.i.v
0000025C: call action_set_relative(argc=1)
00000264: popz
00000268: push.imm.e 0
0000026C: conv.i.v
00000270: call action_set_relative(argc=1)
00000278: popz