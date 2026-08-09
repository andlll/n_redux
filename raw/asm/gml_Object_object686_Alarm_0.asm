// gml_Object_object686_Alarm_0  locals=2 args=0 len=988
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 300
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.imm.e 12
0000003C: conv.i.v
00000040: push.v mon
00000048: call action_if_variable(argc=3)
00000050: pop.v.v local.__b__
00000058: push.local.v local.__b__
00000060: conv.v.b
00000064: bf 0x21E6BAC
00000068: push.imm.e 1
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz
0000007C: push.v mon
00000084: push.imm.e 1
00000088: add.i.v
0000008C: pop.v.v mon
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: call action_set_relative(argc=1)
000000A4: popz
000000A8: b 0x21E6BB8
000000AC: push.imm.e 1
000000B0: pop.v.i mon
000000B8: push.imm.e 2
000000BC: conv.i.v
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.v loan_uno
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x21E6C7C
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.v loan_uno
0000010C: push.imm.e -1
00000110: add.i.v
00000114: pop.v.v loan_uno
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: call action_set_relative(argc=1)
0000012C: popz
00000130: push.imm.e 156
00000134: pushenv 0x21E6C78
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz
0000014C: push.v mon
00000154: push.imm.e -840
00000158: add.i.v
0000015C: pop.v.v mon
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz
00000178: popenv 0x41E6C38
0000017C: push.imm.e 2
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.v loan_due
00000194: call action_if_variable(argc=3)
0000019C: pop.v.v local.__b__
000001A4: push.local.v local.__b__
000001AC: conv.v.b
000001B0: bf 0x21E6D40
000001B4: push.imm.e 1
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz
000001C8: push.v loan_due
000001D0: push.imm.e -1
000001D4: add.i.v
000001D8: pop.v.v loan_due
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: call action_set_relative(argc=1)
000001F0: popz
000001F4: push.imm.e 156
000001F8: pushenv 0x21E6D3C
000001FC: push.imm.e 1
00000200: conv.i.v
00000204: call action_set_relative(argc=1)
0000020C: popz
00000210: push.v mon
00000218: push.imm.e -1680
0000021C: add.i.v
00000220: pop.v.v mon
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: call action_set_relative(argc=1)
00000238: popz
0000023C: popenv 0x41E6CFC
00000240: push.imm.e 2
00000244: conv.i.v
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: push.v loan_tre
00000258: call action_if_variable(argc=3)
00000260: pop.v.v local.__b__
00000268: push.local.v local.__b__
00000270: conv.v.b
00000274: bf 0x21E6E04
00000278: push.imm.e 1
0000027C: conv.i.v
00000280: call action_set_relative(argc=1)
00000288: popz
0000028C: push.v loan_tre
00000294: push.imm.e -1
00000298: add.i.v
0000029C: pop.v.v loan_tre
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: call action_set_relative(argc=1)
000002B4: popz
000002B8: push.imm.e 156
000002BC: pushenv 0x21E6E00
000002C0: push.imm.e 1
000002C4: conv.i.v
000002C8: call action_set_relative(argc=1)
000002D0: popz
000002D4: push.v mon
000002DC: push.imm.e -3333
000002E0: add.i.v
000002E4: pop.v.v mon
000002EC: push.imm.e 0
000002F0: conv.i.v
000002F4: call action_set_relative(argc=1)
000002FC: popz
00000300: popenv 0x41E6DC0
00000304: push.imm.e 2
00000308: conv.i.v
0000030C: push.imm.e 0
00000310: conv.i.v
00000314: push.v loan_quattro
0000031C: call action_if_variable(argc=3)
00000324: pop.v.v local.__b__
0000032C: push.local.v local.__b__
00000334: conv.v.b
00000338: bf 0x21E6EC8
0000033C: push.imm.e 1
00000340: conv.i.v
00000344: call action_set_relative(argc=1)
0000034C: popz
00000350: push.v loan_quattro
00000358: push.imm.e -1
0000035C: add.i.v
00000360: pop.v.v loan_quattro
00000368: push.imm.e 0
0000036C: conv.i.v
00000370: call action_set_relative(argc=1)
00000378: popz
0000037C: push.imm.e 156
00000380: pushenv 0x21E6EC4
00000384: push.imm.e 1
00000388: conv.i.v
0000038C: call action_set_relative(argc=1)
00000394: popz
00000398: push.v mon
000003A0: push.imm.e -8400
000003A4: add.i.v
000003A8: pop.v.v mon
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: popenv 0x41E6E84
000003C8: push.imm.e 0
000003CC: conv.i.v
000003D0: call action_set_relative(argc=1)
000003D8: popz